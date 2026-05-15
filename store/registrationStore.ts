import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

export interface RegisteredUser {
  email: string;
  name: string;
  password: string;
}

export interface RegistrationState {
  registeredUsers: RegisteredUser[];
  isUserRegistered: (email: string) => boolean;
  registerUser: (email: string, name: string, password: string) => Promise<void>;
  loadRegisteredUsers: () => Promise<void>;
}

export const useRegistrationStore = create<RegistrationState>((set, get) => ({
  registeredUsers: [],
  
  isUserRegistered: (email: string) => {
    return get().registeredUsers.some(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );
  },

  registerUser: async (email: string, name: string, password: string) => {
    try {
      const users = get().registeredUsers;
      const newUser: RegisteredUser = { email, name, password };
      const updatedUsers = [...users, newUser];
      
      set({ registeredUsers: updatedUsers });
      
      // Save to AsyncStorage
      await AsyncStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
    } catch (error) {
      console.error('Failed to register user:', error);
      throw error;
    }
  },

  loadRegisteredUsers: async () => {
    try {
      const data = await AsyncStorage.getItem('registeredUsers');
      if (data) {
        const users = JSON.parse(data) as RegisteredUser[];
        set({ registeredUsers: users });
      }
    } catch (error) {
      console.error('Failed to load registered users:', error);
    }
  },
}));
