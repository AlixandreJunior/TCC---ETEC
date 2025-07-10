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
import { getToken } from '../stores/authStore';

function AuthGuard({ children }: { children: React.ReactNode }) {
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const segments = useSegments();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await getToken();
        setIsAuthenticated(!!token);
      } catch (e) {
        console.error("Erro ao verificar token:", e);
        setIsAuthenticated(false);
      } finally {
        setIsAuthReady(true);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (!isAuthReady) return;

    const segment = segments[0] || '';
    const publicRoutes = ['login', 'signup', 'index'];

    const isPublic = publicRoutes.includes(segment);

    // Somente redireciona se estiver em rota errada
    if (!isAuthenticated && !isPublic) {
      router.replace('/login');
    }

    if (isAuthenticated && isPublic) {
      router.replace('/(tabs)/mental');
    }
  }, [isAuthReady, isAuthenticated, segments]);

  if (!isAuthReady) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <>{children}</>;
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

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
      <AuthGuard>
        <Stack screenOptions={{ headerShown: false }}>
          {/* Rotas públicas */}
          <Stack.Screen name="index" />
          <Stack.Screen name="login" />
          <Stack.Screen name="signup" />

          {/* Rotas protegidas */}
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
    backgroundColor: '#fff',
  },
});
