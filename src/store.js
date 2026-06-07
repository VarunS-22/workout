import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

export const store = {
  async get() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;
    const { data } = await supabase
      .from("app_state")
      .select("data")
      .eq("user_id", user.id)
      .maybeSingle();
    return data?.data ?? null;
  },
  async set(value) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await supabase
      .from("app_state")
      .upsert({ user_id: user.id, data: value, updated_at: new Date().toISOString() });
  },
};