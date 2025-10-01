// pages/api/chat.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { GoogleGenAI  } from "@google/genai";
import { getTransactions } from "@/lib/hooks/transcations";
import { createClient } from "@/lib/supabase/client";
import { addMessage } from "@/lib/hooks/chat";

const supabase = await createClient();

// Initialize the Supabase client within the handler for serverless environments
// The createClient function should be the one from @supabase/ssr for Next.js

/**
 * Inserts a new message into the chat_messages table.
 * @param supabase - The Supabase client instance.
 * @param msg - The message object to insert.
 */


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Ensure this is a POST request
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { message, user_id } = req.body;

  if (!user_id || !message) {
    return res.status(400).json({ error: "Missing user_id or message" });
  }

  // Best practice: create client inside the request handler
  const supabase = createClient();

  try {
    // 1. Save the user's message to Supabase
    await addMessage({ user_id, role: "user", content: message });

    // 2. Fetch user's recent expenses to provide context for the AI
    const data = await getTransactions()

    

    const expenseSummary = data
      .map((e) => `• ${e.date}: GHS ${e.amount} - ${e.description} (${e.categories?.name || 'Uncategorized'})`)
      .join("\n");

    // 3. Construct a clear prompt for Gemini
    const prompt = `
      You are a friendly and helpful financial assistant.
      Your task is to answer the user's questions based on their recent spending history.
      Be concise, insightful, and use a conversational tone.
      Reference their specific transactions when it's helpful.

      Here is the user's recent spending history:
      ${expenseSummary || "No expenses found."}

      ---
      User's question: "${message}"
    `;

    // 4. Call the Gemini API
    if (!process.env.GEMINI) {
        throw new Error("GEMINI_API_KEY is not set.");
    }

    const genAI = new GoogleGenAI ({apiKey:process.env.GEMINI_API_KEY});
    

    const response = await genAI.models.generateContent({model:'gemini-2.5-flash', contents:prompt});
    const reply = response.text;

    // 5. Save the AI's response to Supabase
    await addMessage({ user_id, role: "assistant", content: reply });

    // 6. Return the AI's reply to the client
    return res.status(200).json({ reply });

  } catch (err: any) {
    console.error("API handler error:", err);
    return res.status(500).json({ error: "An error occurred while processing your request." });
  }
}
