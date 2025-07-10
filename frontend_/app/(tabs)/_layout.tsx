import { View } from "react-native"
import { Stack } from "expo-router"
import CustomTabBar from "..//../components/CustomTabBar"

export default function TabLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="activity" />
        <Stack.Screen name="mental" />
        <Stack.Screen name="profile" />
      </Stack>
      <CustomTabBar />
    </View>
  )
}
