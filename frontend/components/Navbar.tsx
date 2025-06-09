import { styles } from "@/app/(tabs)/Home/styles"
import { colors } from "@/styles/colors"
import { Bell, Heart } from "lucide-react-native"
import { Text, TouchableOpacity, View } from "react-native"

export const Navbar = ({title}: {title: string}) => {
    return(
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Heart size={24} color={colors.blue.main} />
          </View>
          <Text style={styles.headerTitle}>{title}</Text>
          <TouchableOpacity>
            <Bell size={24} color={colors.text.secondary} />
          </TouchableOpacity>
        </View>
    )
}