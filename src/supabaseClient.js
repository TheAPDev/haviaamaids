import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://bcbgouhdvcxurtlsduqs.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjYmdvdWhkdmN4dXJ0bHNkdXFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwMTQ4NzYsImV4cCI6MjA3MTU5MDg3Nn0.p8uWEuyxY9XbtI0EjE1uJv9EXl6bgUD_tO8uKb8YIjE"

export const supabase = createClient(supabaseUrl, supabaseKey)
