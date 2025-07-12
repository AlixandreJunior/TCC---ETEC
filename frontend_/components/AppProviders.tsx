import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '@/context/AuthContext';

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </SafeAreaProvider>
  );
}
