"use client"

import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native"
import { Brain, Heart, User } from "lucide-react-native"
import { useRouter, usePathname } from "expo-router"

const { width } = Dimensions.get("window")

export default function CustomTabBar() {
  const router = useRouter()
  const pathname = usePathname()

  const tabs = [
    {
      name: "mental",
      title: "Mental",
      icon: Brain,
      route: "/(tabs)/mental",
    },
    {
      name: "index",
      title: "Saúde",
      icon: Heart,
      route: "/(tabs)",
    },
    {
      name: "profile",
      title: "Você",
      icon: User,
      route: "/(tabs)/profile",
    },
  ]

  const isActive = (route: string) => {
    if (route === "/(tabs)" && pathname === "/(tabs)") return true
    if (route !== "/(tabs)" && pathname.includes(route.split("/").pop() || "")) return true
    return false
  }

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const active = isActive(tab.route)
        const IconComponent = tab.icon

        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tab}
            onPress={() => router.push(tab.route as any)}
            activeOpacity={0.7}
          >
            <IconComponent size={28} color={active ? "#79D457" : "#9CA3AF"} />
            <Text style={[styles.label, { color: active ? "#79D457" : "#9CA3AF" }]}>{tab.title}</Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    height: 90,
    paddingTop: 15,
    paddingBottom: 25,
    paddingHorizontal: 20,
    justifyContent: "space-around",
    alignItems: "center",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "400",
    marginTop: 8,
    textAlign: "center",
  },
})
