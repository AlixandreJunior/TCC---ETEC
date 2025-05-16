"use client"

import { useEffect, useState } from "react"
import { View, Text, StyleSheet, Dimensions, Animated, Image } from "react-native"
import { LinearGradient } from "expo-linear-gradient"

const { width, height } = Dimensions.get("window")

export default function SplashScreen({ onFinish }: { onFinish?: () => void }) {
  const [fadeAnim] = useState(new Animated.Value(0))
  const [heartbeatAnim] = useState(new Animated.Value(0))

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start()

    // Heartbeat animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(heartbeatAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(heartbeatAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ).start()

    // Auto-navigate after 3 seconds
    if (onFinish) {
      const timer = setTimeout(() => {
        onFinish()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [fadeAnim, heartbeatAnim, onFinish])

  const heartbeatScale = heartbeatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.05],
  })

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#8A2BE2", "#6A5ACD", "#4169E1"]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: heartbeatScale }],
            },
          ]}
        >
          <View style={styles.heartContainer}>
            <Image
              source={{
                uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cYCrg7UOFOTd91hYdt7M2d1x26FWYq.png",
              }}
              style={styles.heartImage}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.logoText}>VITACARE</Text>
        </Animated.View>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: width,
  },
  heartContainer: {
    width: width,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  heartImage: {
    width: width * 1.2, // Aumentado para 120% da largura da tela
    height: 200,
  },
  logoText: {
    color: "white",
    fontSize: 48,
    fontWeight: "bold",
    marginTop: 20,
    letterSpacing: 2,
    fontFamily: "Poppins-Bold",
  },
})
