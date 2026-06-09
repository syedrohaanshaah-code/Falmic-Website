import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gryrvewyctrkvbyxbxta.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdyeXJ2ZXd5Y3Rya3ZieXhieHRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0ODc1NDUsImV4cCI6MjA5NDA2MzU0NX0.XZAS7AIOUWcVheWrEQ6hoLMgk09rLhZjkGc64G-MO7c";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);