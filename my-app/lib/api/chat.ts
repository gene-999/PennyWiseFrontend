// pages/api/chat.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@/lib/supabase/server";
import OpenAI from "openai";

// Init OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const supabase = await createClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { message, user_id } = req.body;

  if (!user_id || !message) {
    return res.status(400).json({ error: "Missing user_id or message" });
  }

  await supabase
    .from("chat_messages")
    .insert([{ user_id, role: "user", content: message }]);

  const { data: history } = await supabase
    .from("chat_messages")
    .select("role, content")
    .eq("user_id", user_id)
    .order("created_at", { ascending: true })
    .limit(10); // You can tune this based on token limits

  // Step 1: Fetch user expenses
  const { data: expenses, error } = await supabase
    .from("expenses")
    .select("amount, description, date, categories(name)")
    .eq("user_id", user_id)
    .order("date", { ascending: false });

  if (error) return res.status(500).json({ error: error.message });

  const expenseSummary = expenses
    .map((e) => `• ${e.date}: GHS ${e.amount} - ${e.description}`)
    .join("\n");

  // 4. Combine history and system prompt
  const messages = [
    {
      role: "system",
      content: `You are a helpful financial assistant. Here's the user's recent spending:\n\n${expenseSummary}`,
    },
    ...(history || []),
    { role: "user", content: message },
  ];

  const prompt = `
You are a helpful financial assistant. Here is the user's recent transaction history:
${expenseSummary}

User question: "${message}"

Answer in a friendly tone, referencing their transaction data when relevant.
`;

  // Step 3: Get AI response
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt + messages }],
    });

    const reply = completion.choices[0].message?.content;
    await supabase
      .from("chat_messages")
      .insert([{ user_id, role: "assistant", content: reply }]);

    return res.status(200).json({ reply });
  } catch (err) {
    return res.status(500).json({ error: "AI error" });
  }
}
