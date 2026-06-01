import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';
import { useAuthStore } from '@/store/authStore';
import { useDesignStore } from '@/store/designStore';

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  const restoreUser = useAuthStore((state) => state.restoreUser);
  const loadDesigns = useDesignStore((state) => state.loadDesigns);
  const [appReady, setAppReady] = useState(false);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // Restore user and designs on app start
  useEffect(() => {
    const initializeApp = async () => {
      try {
        await restoreUser();
        // Load designs from local storage first
        await loadDesigns();
        // Then try to load from Supabase in background
        const { loadDesignsFromSupabase } = useDesignStore.getState();
        loadDesignsFromSupabase().catch(err => console.error('Failed to load designs from Supabase:', err));
      } catch (error) {
        console.error('Failed to initialize app:', error);
      } finally {
        setAppReady(true);
      }
    };
    
    initializeApp();
  }, []);

  if (!loaded || !appReady) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="upload-designs" />
            <Stack.Screen name="manage-designs" />
            <Stack.Screen name="manage-featured" />
            <Stack.Screen name="product-details" />
            <Stack.Screen name="reset-password" />
          </>
        ) : (
          <>
            <Stack.Screen name="index" />
            <Stack.Screen name="country-select" />
            <Stack.Screen name="language-select" />
            <Stack.Screen name="login" />
            <Stack.Screen name="signup" />
            <Stack.Screen name="reset-password" />
          </>
        )}
      </Stack>
    </ThemeProvider>
  );
}
