import { createClient } from "@/lib/supabase/client";

const supabase = await createClient();

export async function getTransactions() {
  try {
    const { data, error } = await supabase.from('transactions').select('*');
    if (error) throw error;
    return data;
  } catch (err) {
    throw err;
  }
}

export async function getTransactionById(id) {
  try {
    const { data, error } = await supabase.from('transactions').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  } catch (err) {
    throw err;
  }
}

export async function addTransaction(txn) {
  try {
    const { data, error } = await supabase.from('transactions').insert([txn]).select();
    if (error) throw error;
    return data;
  } catch (err) {
    console.log(err)
    throw err;
  }
}

export async function updateTransaction(id, updates) {
  try {
    const { data, error } = await supabase.from('transactions').update(updates).eq('id', id).select();
    if (error) throw error;
    console.log(data)
    return data;
  } catch (err) {
    throw err;
  }
}

export async function deleteTransaction(id) {
  try {
    const { data, error } = await supabase.from('transactions').delete().eq('id', id);
    if (error) throw error;
    return data;
  } catch (err) {
    throw err;
  }
}
