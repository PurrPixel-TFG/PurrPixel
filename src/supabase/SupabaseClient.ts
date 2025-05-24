// supabase/SupabaseClient.ts
// Password: WangYonMena
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nkbafyaohkooaazapcui.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5rYmFmeWFvaGtvb2FhemFwY3VpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1OTE1NTUsImV4cCI6MjA2MzE2NzU1NX0.iYKDzZtlBNVMMPfTERbmXjt0TwGSk_YocqTJtHx7UMw'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
