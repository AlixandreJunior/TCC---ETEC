import { styles } from "@/app/(tabs)/Home/styles"
import MetasScreen from "@/app/metas/metas"
import { colors } from "@/styles/colors"
import { useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"

export const GoalCard = () => {
    const [metasModalVisible, setMetasModalVisible] = useState(false) 
    
    const handleGerenciarMetas = () => {
        setMetasModalVisible(true)
    }
    return(
        <>
        <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Metas</Text>
            <View style={styles.goalItem}>
            <Text style={styles.goalLabel}>Passos</Text>
            <View style={styles.goalProgress}>
                <View style={[styles.goalProgressFill, { width: "66%", backgroundColor: "#4CAF50" }]} />
            </View>
            <Text style={styles.goalValue}>5.340/8.000</Text>
            </View>
            <View style={styles.goalItem}>
            <Text style={styles.goalLabel}>Hidratação</Text>
            <View style={styles.goalProgress}>
                <View style={[styles.goalProgressFill, { width: "75%", backgroundColor: colors.blue.main }]} />
            </View>
            <Text style={styles.goalValue}>1,5L/2L</Text>
            </View>
            <View style={styles.goalItem}>
            <Text style={styles.goalLabel}>Mindfulness</Text>
            <View style={styles.goalProgress}>
                <View style={[styles.goalProgressFill, { width: "83%", backgroundColor: colors.primary }]} />
            </View>
            <Text style={styles.goalValue}>25/30</Text>
            </View>
            <View style={styles.goalItem}>
            <Text style={styles.goalLabel}>Exercícios</Text>
            <View style={styles.goalProgress}>
                <View style={[styles.goalProgressFill, { width: "83%", backgroundColor: "#4CAF50" }]} />
            </View>
            <Text style={styles.goalValue}>25/30</Text>
            </View>
            <TouchableOpacity style={[styles.actionButton, styles.blueButton]} onPress={handleGerenciarMetas}>
            <Text style={styles.actionButtonText}>Gerenciar Metas</Text>
            </TouchableOpacity>
        </View>

        <MetasScreen visible={metasModalVisible} onClose={() => setMetasModalVisible(false)} />
        </>
    )
}