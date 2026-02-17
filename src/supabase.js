import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zvduzcplfghxslrzcwgf.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2ZHV6Y3BsZmdoeHNscnpjd2dmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzNDk2MTUsImV4cCI6MjA4NjkyNTYxNX0.fcYiAXLIm3a5hYSADCV3ZfVU_CoyAG6vtJhVQn7AbDU";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
