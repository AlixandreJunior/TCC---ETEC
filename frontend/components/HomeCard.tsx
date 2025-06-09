import { RelativePathString, useRouter } from "expo-router"
import { View, Text, TouchableOpacity } from "react-native"
import { styles } from "../app/(tabs)/Home/styles"
import { Brain } from "lucide-react-native"
import { colors } from "@/styles/colors"
import { Component, ReactNode } from "react"


export const HomeCard = ({title, screen, icon}: {title: string, screen: RelativePathString, icon: ReactNode}) => {
      const navigation = useRouter()
    
    return(
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            {icon}
            <Text style={styles.sectionTitle}>{title}</Text>
          </View>
          <Text style={styles.sectionSubtitle}>Últimos 7 dias</Text>
          <View style={styles.weekProgress}>
            {[0.4, 0.6, 0.8, 1].map((opacity, index) => (
              <View key={index} style={[styles.dayIndicator, { backgroundColor: `rgba(138, 43, 226, ${opacity})` }]} />
            ))}
          </View>
          <TouchableOpacity style={styles.actionButton} onPress={() => {navigation.push(screen)}}>
            <Text style={styles.actionButtonText}>Acessar Seção</Text>
          </TouchableOpacity>
        </View>
    )
}