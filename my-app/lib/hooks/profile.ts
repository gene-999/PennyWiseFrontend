import { createClient } from "@/lib/supabase/client";

const supabase = await createClient();

export async function getProfiles() {
  try {
    const { data, error } = await supabase.from('profiles').select('*');
    if (error) throw error;
    return data;
  } catch (err) {
    throw err;
  }
}

export async function getProfileById(id) {
  try {
    const { data, error } = await supabase.from('profiles').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  } catch (err) {
    throw err;
  }
}

export async function addProfile(profile) {
  try {
    const { data, error } = await supabase.from('profiles').insert([profile]).select();
    if (error) throw error;
    return data;
  } catch (err) {
    throw err;
  }
}

export async function updateProfile(id, updates) {
  try {
    const { data, error } = await supabase.from('profiles').update(updates).eq('id', id).select();
    if (error) throw error;
    return data;
  } catch (err) {
    throw err;
  }
}

export async function deleteProfile(id) {
  try {
    const { data, error } = await supabase.from('profiles').delete().eq('id', id);
    if (error) throw error;
    return data;
  } catch (err) {
    throw err;
  }
}
