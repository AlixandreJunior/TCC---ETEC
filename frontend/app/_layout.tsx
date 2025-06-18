import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { useFrameworkReady } from "@/hooks/useFrameworkReady"
import { SplashScreen as ExpoSplashScreen } from "expo-router"

ExpoSplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  useFrameworkReady()

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="signup" />
        <Stack.Screen name="login" />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="(tabs)" />
      </Stack>
      <StatusBar style="auto" />
    </>
  )
}
