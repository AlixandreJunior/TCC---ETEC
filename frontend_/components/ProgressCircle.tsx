"use client"

import type React from "react"
import { View, StyleSheet } from "react-native"
import Svg, { Circle } from "react-native-svg"

interface ProgressCircleProps {
  progress: number // 0-100
  size: number
  strokeWidth?: number
  color?: string
  backgroundColor?: string
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({
  progress,
  size,
  strokeWidth = 8,
  color = "#9CC9FF",
  backgroundColor = "#E5E7EB",
}) => {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} style={styles.svg}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  svg: {
    position: "absolute",
  },
})

export default ProgressCircle
