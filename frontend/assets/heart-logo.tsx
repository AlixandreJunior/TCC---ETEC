import { Image, type ImageStyle, type StyleProp } from "react-native"

interface HeartLogoProps {
  style?: StyleProp<ImageStyle>
  size?: number
}

export default function HeartLogo({ style, size = 500 }: HeartLogoProps) {
  return (
    <Image
      source={{
        uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cYCrg7UOFOTd91hYdt7M2d1x26FWYq.png",
      }}
      style={[{ width: size, height: size }, style]}
      resizeMode="contain"
    />
  )
}
