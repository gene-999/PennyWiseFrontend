// lib/chatbot/askGemini.ts
import { GoogleGenAI } from '@google/genai';
import { getTransactions } from '@/lib/hooks/transcations'; // adjust path
import { addMessage } from './chat';

const genAI = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI });

export async function askGemini( message: any, user_id: any ) {
  if (!user_id || !message) throw new Error('Missing user_id or message');



  // Save user message
  await addMessage(
    { user_id, role: 'user', content: message },
  );

  // Get recent transactions
  const transactions = await getTransactions(); // You should pass user_id here

  const expenseSummary = transactions
    .map(
      (t) =>
        `• ${t.date}: GHS ${t.amount} - ${t.description} (${t.category || t.category?.name || 'Uncategorized'})`
    )
    .join('\n');

  const prompt = `
    You are a friendly and helpful financial assistant.
    Your task is to answer the user's questions based on their recent spending history.
    Be concise, insightful, and use a conversational tone.
    Reference their specific transactions when it's helpful.
    Your response must be in the form of normal text, no markdown since I am directly pasting it in chat
    
    Here is the user's recent spending history:
    ${expenseSummary || 'No expenses found.'}

    ---
    User's question: "${message}"
  `;

  // Ask Gemini
  const result = await genAI.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });

  const reply = result.text || 'Sorry, I could not generate a response.';

  // Save assistant reply
  await addMessage(
    { user_id, role: 'assistant', content: reply },
  );

  return reply;
}
