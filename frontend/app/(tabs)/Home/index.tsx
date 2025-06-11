import { ScrollView} from "react-native"
import { colors } from "@/styles/colors"
import { styles} from './styles'
import { Brain, Heart} from "lucide-react-native"
import { HomeCard } from "@/components/HomeCard"
import { HealthMetrics } from "@/components/HealthMetrics"
import { Navbar } from "@/components/Navbar"
import { GoalCard} from "@/components/GoalCard"
import { ObjectiveCard } from "@/components/ObjectivesCard"

export default function HomeScreen() {
  return (
    <>
      <ScrollView style={styles.container}>
        <Navbar title = {'Início'}/>

        <HealthMetrics/>

        <HomeCard title={'Saúde Mental'} screen="../(tabs)/Mental" icon={<Brain size={20} color={colors.primary} />}/>
        <HomeCard title={'Saúde Fisica'} screen="../(tabs)/Activity" icon={<Heart size={20} color="#4CAF50" />}/>

        <GoalCard/>

        <ObjectiveCard/>
      </ScrollView>
    </>
  )
}
