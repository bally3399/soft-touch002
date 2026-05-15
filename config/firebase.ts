import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yfbroftoijiqslvbmanz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmYnJvZnRvaWppcXNsdmJtYW56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3NjAzOTgsImV4cCI6MjA5NDMzNjM5OH0.T5ZpEBYibICQyhTqFG-smOvHhWGSz1a6fQazBtrLRl4';

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
