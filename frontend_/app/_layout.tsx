import { Stack, router, useSegments } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useEffect, useState } from 'react';
import { getToken } from '../stores/authStore'; // Ensure this path is correct based on your project structure

/**
 * AuthGuard Component
 * This component manages authentication checks and redirects users.
 * It is designed to be placed within the RootLayout to protect routes.
 */
function AuthGuard({ children }: { children: React.ReactNode }) {
  // State to track if the authentication check has completed
  const [isAuthReady, setIsAuthReady] = useState(false);
  // State to store the authentication status (true if logged in, false otherwise)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Hook to get the current URL segments (e.g., ['login'], ['(tabs)', 'home'])
  const segments = useSegments();

  // useEffect for initial authentication check when the component mounts
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await getToken();
        // Set isAuthenticated based on whether a token exists
        setIsAuthenticated(!!token);
      } catch (e) {
        console.error("Error checking authentication token:", e);
        setIsAuthenticated(false); // Assume not authenticated on error
      } finally {
        setIsAuthReady(true); // Mark authentication check as complete
      }
    };

    checkAuth();
  }, []); // Empty dependency array ensures this runs only once on mount

  // useEffect for handling navigation based on authentication status
  useEffect(() => {
    // Wait until the initial authentication check is complete
    if (!isAuthReady) {
      return;
    }

    // Determine the current top-level segment (e.g., 'login', '(tabs)', 'index')
    const currentSegment = segments[0];
    // Define routes that are publicly accessible (don't require authentication)
    const publicRoutes = ['login', 'signup', 'index']; // 'index' corresponds to '/'

    // Check if the current route is one of the public routes
    const isPublicRoute = publicRoutes.includes(currentSegment);

    if (!isAuthenticated && !isPublicRoute) {
      router.replace('/login');
    } else if (isAuthenticated && isPublicRoute) {
      router.replace('/(tabs)/mental');
    }
  }, [isAuthReady, isAuthenticated, segments]); // Re-run this effect when auth state or route segments change

  // Show a loading indicator while the authentication check is in progress
  if (!isAuthReady) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Render children (the Stack navigator) once authentication is ready
  return <>{children}</>;
}

/**
 * RootLayout Component
 * This is the main layout component for your Expo application.
 * It loads fonts and sets up the main navigation stack with an authentication guard.
 */
export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  // Show a loading indicator while fonts are loading
  if (!fontsLoaded) {
    return (
      <SafeAreaProvider>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      {/* Wrap the main navigation Stack with the AuthGuard */}
      <AuthGuard>
        <Stack screenOptions={{ headerShown: false }}>
          {/* Public Routes (accessible without login) */}
          <Stack.Screen name="index" />
          <Stack.Screen name="login" />
          <Stack.Screen name="signup" />

          {/* Authenticated Routes (require login) */}
          {/* Assuming '(tabs)' is the main part of your app for logged-in users */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </AuthGuard>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Or any background color you prefer for the loading screen
  },
});