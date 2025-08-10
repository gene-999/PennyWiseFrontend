import { createClient } from "@/lib/supabase/server";

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
