import React, { useEffect } from 'react';
import { Slot, Stack } from 'expo-router';
import { useFonts, 
  Poppins_400Regular, 
  Poppins_500Medium, 
  Poppins_600SemiBold, 
  Poppins_700Bold 
} from '@expo-google-fonts/poppins';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AppProviders from '@/components/AppProviders';
import AuthGuard from '@/components/AuthGuard';
import * as NavigationBar from "expo-navigation-bar";


export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    async function setNavigationBar() {
      await NavigationBar.setVisibilityAsync("hidden"); 
      await NavigationBar.setBehaviorAsync('overlay-swipe');
    }
    setNavigationBar();
  }, []);


  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AppProviders>
      <AuthGuard>
            <Slot/>
      </AuthGuard>
    </AppProviders>
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
