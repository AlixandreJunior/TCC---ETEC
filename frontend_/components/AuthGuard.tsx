import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { router, useSegments } from 'expo-router';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [isAuthReady, setIsAuthReady] = useState(false);
  const segments = useSegments();

  useEffect(() => {
    setIsAuthReady(true);
  }, []);

  useEffect(() => {
    if (!isAuthReady) return;

    const segment = segments[0] || '';
    const publicRoutes = ['auth', ''];

    const isPublic = publicRoutes.includes(segment);

    if (!isAuthenticated && !isPublic) {
      router.replace('/auth/login');
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

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
