// pages/api/chat.ts

import { createClient } from "@/lib/supabase/client";

const supabase = await createClient();

export async function getMessages() {
  try {
    const { data, error } = await supabase.from('chat_messages').select('*');
    if (error) throw error;
    return data;
  } catch (err) {
    throw err;
  }
}

export async function getMessageById(id) {
  try {
    const { data, error } = await supabase.from('chat_messages').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  } catch (err) {
    throw err;
  }
}

export async function addMessage(msg) {
  try {
    const { data, error } = await supabase.from('chat_messages').insert([msg]).select();
    if (error) throw error;
    return data;
  } catch (err) {
    throw err;
  }
}

export async function updateMessage(id, updates) {
  try {
    const { data, error } = await supabase.from('chat_messages').update(updates).eq('id', id).select();
    if (error) throw error;
    return data;
  } catch (err) {
    throw err;
  }
}

export async function deleteMessage(id) {
  try {
    const { data, error } = await supabase.from('chat_messages').delete().eq('id', id);
    if (error) throw error;
    return data;
  } catch (err) {
    throw err;
  }
}
