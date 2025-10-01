import { createClient } from "@/lib/supabase/client";

const supabase = await createClient();

export async function getMonthlyStats(userId: string, start: string, end: string) {
  const { data, error } = await supabase
    .from("expenses")
    .select("amount, date")
    .eq("user_id", userId)
    .gte("date", start)
    .lte("date", end);

  if (error) throw new Error(error.message);

  return data;
}


export function summarizeExpenses(expenses: { amount: number; date: string }[]) {
  const total = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
  return {
    total,
    count: expenses.length,
  };
}

export async function createCategory(userId: string, name: string, type: string) {
  const { data, error } = await supabase.from("categories").insert([
    { user_id: userId, name, type },
  ]);

  if (error) throw new Error(error.message);
  return data;
}



// Read all categories
export async function getCategories() {
  try {
    const { data, error } = await supabase.from('categories').select('*');
    if (error) throw error;
    return data;
  } catch (err) {
    throw err;
  }
}

// Read category by ID
export async function getCategoryById(id) {
  try {
    const { data, error } = await supabase.from('categories').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  } catch (err) {
    throw err;
  }
}

// Insert category
export async function addCategory(category) {
  try {
    const { data, error } = await supabase.from('categories').insert([category]).select();
    if (error) throw error;
    return data;
  } catch (err) {
    throw err;
  }
}

// Update category
export async function updateCategory(id, updates) {
  try {
    const { data, error } = await supabase.from('categories').update(updates).eq('id', id).select();
    if (error) throw error;
    return data;
  } catch (err) {
    throw err;
  }
}

// Delete category
export async function deleteCategory(id) {
  try {
    const { data, error } = await supabase.from('categories').delete().eq('id', id);
    if (error) throw error;
    return data;
  } catch (err) {
    throw err;
  }
}

