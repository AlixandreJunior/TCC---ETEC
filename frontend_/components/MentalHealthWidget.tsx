"use client"

import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native"
import { MapPin, Droplets } from "lucide-react-native"
import Svg, { Path, Circle } from "react-native-svg"

const { width, height } = Dimensions.get("window")

// Componente para o ícone do sapato
const ShoeIcon = ({ size = 24, color = "#000" }) => (
  <Svg width={size} height={size} viewBox="0 0 41 35" fill="none">
    <Path
      d="M6.71284 12.8521H0.103274C0.240974 12.4387 0.422048 12.0471 0.646498 11.6774C0.870948 11.3077 1.1374 10.9462 1.44584 10.593L9.39798 1.46809C9.9832 0.78889 10.7667 0.338254 11.7485 0.116185C12.7303 -0.105885 13.668 -0.00961539 14.5617 0.404993L16.0076 1.02513C16.7305 1.34997 17.2902 1.79293 17.6868 2.35401C18.0834 2.91509 18.281 3.53523 18.2796 4.21443V7.93528L22.1007 7.09366C23.1335 6.85741 24.1318 6.96845 25.0957 7.42676C26.0596 7.88508 26.7137 8.54183 27.0579 9.39704L30.4143 18.079L39.1927 25.6093C39.8812 26.1999 40.3549 26.8348 40.6137 27.514C40.8726 28.1932 41.0014 28.9167 41 29.6845C41 30.7771 40.6557 31.7516 39.9672 32.608C39.2787 33.4644 38.3837 34.0993 37.2821 34.5127L13.8388 15.2884C12.8405 14.4911 11.7389 13.8857 10.534 13.4723C9.32913 13.0588 8.05541 12.8521 6.71284 12.8521ZM24.7859 35C23.7531 35 22.772 34.8376 21.8426 34.5127C20.9131 34.1879 20.0525 33.7302 19.2607 33.1396L2.47859 20.0723C1.82452 19.5703 1.29093 19.0021 0.877833 18.3678C0.464735 17.7335 0.172124 17.0762 0 16.3958H6.71284C7.50462 16.3958 8.27091 16.5139 9.01173 16.7501C9.75256 16.9864 10.4149 17.3555 10.9987 17.8575L31.8602 35H24.7859Z"
      fill={color}
    />
  </Svg>
)

// Componente para o círculo de progresso
const ProgressCircle = ({
  progress,
  size = 80,
  strokeWidth = 6,
  color = "#9CC9FF",
}: {
  progress: number
  size?: number
  strokeWidth?: number
  color?: string
}) => {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <Svg width={size} height={size} style={{ transform: [{ rotate: "-90deg" }] }}>
      <Circle cx={size / 2} cy={size / 2} r={radius} stroke="#E5E7EB" strokeWidth={strokeWidth} fill="transparent" />
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
      />
    </Svg>
  )
}

export default function MentalHealthWidget() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard de Saúde Mental</Text>
      <Text style={styles.subtitle}>Acompanhe seu bem-estar diário</Text>

      {/* Stats principais */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <View style={styles.progressContainer}>
            <ProgressCircle progress={65} size={80} color="#9CC9FF" />
            <View style={styles.progressContent}>
              <ShoeIcon size={20} color="#000" />
            </View>
          </View>
          <Text style={styles.statValue}>6.565</Text>
          <Text style={styles.statLabel}>passos</Text>
        </View>

        <View style={styles.statItem}>
          <View style={styles.progressContainer}>
            <ProgressCircle progress={53} size={80} color="#9CC9FF" />
            <View style={styles.progressContent}>
              <MapPin size={16} color="#3B82F6" />
            </View>
          </View>
          <Text style={styles.statValue}>5,31</Text>
          <Text style={styles.statLabel}>km</Text>
        </View>

        <View style={styles.statItem}>
          <View style={styles.progressContainer}>
            <ProgressCircle progress={75} size={80} color="#9CC9FF" />
            <View style={styles.progressContent}>
              <Droplets size={16} color="#3B82F6" />
            </View>
          </View>
          <Text style={styles.statValue}>750</Text>
          <Text style={styles.statLabel}>ml água</Text>
        </View>
      </View>

      {/* Cards de progresso */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Exercícios desta semana</Text>
        <Text style={styles.cardValue}>3 de 5 dias</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: "60%" }]} />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Mindfulness</Text>
        <Text style={styles.cardValue}>5 de 7 dias</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: "71%" }]} />
        </View>
      </View>

      <TouchableOpacity style={styles.actionButton}>
        <Text style={styles.actionButtonText}>Ver detalhes completos</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: width * 0.05,
    margin: width * 0.05,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#374151",
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  statItem: {
    alignItems: "center",
  },
  progressContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  progressContent: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  statValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
  },
  card: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: "#E5E7EB",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#79D457",
    borderRadius: 3,
  },
  actionButton: {
    backgroundColor: "#79D457",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 8,
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
})
