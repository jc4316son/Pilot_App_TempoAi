import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || "";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function createAccount() {
  const { data, error } = await supabase.auth.signUp({
    email: "jc4316son@gmail.com",
    password: "Slayton1",
    options: {
      data: {
        name: "jc4316son",
      },
    },
  });

  if (error) {
    console.error("Error creating account:", error);
    return;
  }

  console.log("Account created successfully:", data);
}

createAccount();
