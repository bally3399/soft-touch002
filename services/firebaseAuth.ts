import { supabase } from '@/config/firebase';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  country?: string;
  language?: string;
  createdAt: number;
}

// Admin emails
const adminEmails = [
  'softtouch133@gmail.com',
  'isiakaabdulsalamolayinka@gmail.com',
  'softtouch563@gmail.com',
  'sulaimabaliqis@gmail.com',
];

// Sign up with email and password
export const signUp = async (
  email: string,
  password: string,
  name: string
): Promise<UserProfile> => {
  try {
    // Sign up user - the trigger will auto-create the profile
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });

    if (error) throw error;
    if (!data.user) throw new Error('Sign up failed');

    return {
      id: data.user.id,
      email,
      name,
      country: 'NG',
      language: 'en',
      createdAt: Date.now(),
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Sign in with email and password
export const signIn = async (email: string, password: string): Promise<UserProfile> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    if (!data.user) throw new Error('Sign in failed');

    // Return user profile without fetching from DB
    return {
      id: data.user.id,
      email,
      name: data.user.user_metadata?.name || email.split('@')[0],
      country: 'NG',
      language: 'en',
      createdAt: Date.now(),
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Sign out
export const logOut = async (): Promise<void> => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Get current user profile
export const getCurrentUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', uid)
      .single();

    if (error) return null;
    return data as UserProfile;
  } catch (error: any) {
    return null;
  }
};

// Update user profile
export const updateUserProfile = async (
  uid: string,
  updates: Partial<UserProfile>
): Promise<void> => {
  try {
    const { error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', uid);

    if (error) throw error;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Update user name
export const updateUserName = async (uid: string, name: string): Promise<void> => {
  try {
    const { error: authError } = await supabase.auth.updateUser({
      data: { name },
    });

    if (authError) throw authError;

    const { error: dbError } = await supabase
      .from('users')
      .update({ name })
      .eq('id', uid);

    if (dbError) throw dbError;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Change password
export const changePassword = async (newPassword: string): Promise<void> => {
  try {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      console.error('Password change error:', error);
      throw error;
    }

    if (!data.user) {
      throw new Error('Failed to update password');
    }
  } catch (error: any) {
    console.error('Change password exception:', error);
    throw new Error(error.message || 'Failed to change password');
  }
};

// Check if user is admin
export const isUserAdmin = (email: string): boolean => {
  return adminEmails.includes(email);
};
