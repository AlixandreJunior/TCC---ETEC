import { Text, View } from "react-native"
import { CircularProgress } from "./CircularProgress"
import { colors } from "@/styles/colors"
import { styles } from "@/app/(tabs)/Home/styles"

export const HealthMetrics = () => {
    return(
        <View style={styles.healthSection}>
            <CircularProgress percentage={70} size={120} />
            <View style={styles.healthMetrics}>
            <View style={styles.metric}>
                <Text style={styles.metricLabel}>Saúde Mental</Text>
                <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: "70%", backgroundColor: colors.blue.main }]} />
                </View>
                <Text style={styles.metricValue}>70%</Text>
            </View>
            <View style={styles.metric}>
                <Text style={styles.metricLabel}>Saúde Física</Text>
                <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: "70%", backgroundColor: "#4CAF50" }]} />
                </View>
                <Text style={styles.metricValue}>70%</Text>
            </View>
            </View>
        </View>
    )
}