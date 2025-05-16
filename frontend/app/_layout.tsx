"use client"

import { useEffect, useState } from "react"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { useFrameworkReady } from "@/hooks/useFrameworkReady"
import { SplashScreen as ExpoSplashScreen } from "expo-router"
import { useFonts } from "expo-font"
import {
  Poppins_300Light as Poppins_Light,
  Poppins_400Regular as Poppins_Regular,
  Poppins_500Medium as Poppins_Medium,
  Poppins_600SemiBold as Poppins_SemiBold,
  Poppins_700Bold as Poppins_Bold,
} from "@expo-google-fonts/poppins"
import SplashScreen from "@/components/Splash-Screen"


ExpoSplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  useFrameworkReady()
  const [showSplash, setShowSplash] = useState(true)

  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Light": Poppins_Light,
    "Poppins-Regular": Poppins_Regular,
    "Poppins-Medium": Poppins_Medium,
    "Poppins-SemiBold": Poppins_SemiBold,
    "Poppins-Bold": Poppins_Bold,
  })

  useEffect(() => {
    if (fontsLoaded || fontError) {
      ExpoSplashScreen.hideAsync()
    }
  }, [fontsLoaded, fontError])

  if (!fontsLoaded && !fontError) {
    return null
  }


  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="signup" />
        <Stack.Screen name="login" />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="metas" />
      </Stack>
      <StatusBar style="auto" />
    </>
  )
}
