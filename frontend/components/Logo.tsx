import { Image, StyleSheet, View, type ImageStyle, type StyleProp } from "react-native"

interface LogoProps {
  size?: "small" | "medium" | "large"
  style?: StyleProp<ImageStyle>
}

export default function Logo({ size = "medium", style }: LogoProps) {
  const getSize = () => {
    switch (size) {
      case "small":
        return { width: 150, height: 32 }
      case "large":
        return { width: 350, height: 75 }
      case "medium":
      default:
        return { width: 280, height: 60 }
    }
  }

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6HeidDA43Sm6pqoG0TL4Jkz7yrdKeG.png",
        }}
        style={[getSize(), style]}
        resizeMode="contain"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
})
