import { createClient } from "@/lib/supabase/server";

const supabase = await createClient();

export async function createExpense({
  userId,
  categoryId,
  amount,
  description,
  date,
}: {
  userId: string;
  categoryId: string;
  amount: number;
  description: string;
  date: string;
}) {
  const { data, error } = await supabase.from("expenses").insert([
    {
      user_id: userId,
      category_id: categoryId,
      amount,
      description,
      date,
    },
  ]);

  if (error) throw new Error(error.message);
  return data;
}


export async function getUserExpenses(userId: string) {
  const { data, error } = await supabase
    .from("expenses")
    .select("*, categories(name, type)")
    .eq("user_id", userId)
    .order("date", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}


export async function updateExpense({
  expenseId,
  updates,
}: {
  expenseId: string;
  updates: Partial<{
    category_id: string;
    amount: number;
    description: string;
    date: string;
  }>;
}) {
  const { data, error } = await supabase
    .from("expenses")
    .update(updates)
    .eq("id", expenseId)
    .select();

  if (error) throw new Error(error.message);
  return data;
}

export async function deleteExpense(expenseId: string) {
  const { error } = await supabase
    .from("expenses")
    .delete()
    .eq("id", expenseId);

  if (error) throw new Error(error.message);
}

