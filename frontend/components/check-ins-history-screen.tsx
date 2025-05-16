"use client"

import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,
  StatusBar,
} from "react-native"
import { ArrowLeft, ChevronDown, HelpCircle, List } from "lucide-react-native"
import { router } from "expo-router"
import Svg, { Path, ClipPath, G, Rect, Defs } from "react-native-svg"

const { width } = Dimensions.get("window")

// SVG Components
const CheckInsSvgIcons = () => (
  <Svg width="72" height="33" viewBox="0 0 72 33" fill="none">
    <Path d="M72 32.5H0V0.5H72V32.5Z" stroke="#E5E7EB" />
    <Path
      d="M20 0.5C26.6274 0.5 32 5.87258 32 12.5V20.5C32 27.1274 26.6274 32.5 20 32.5H12C5.37258 32.5 0 27.1274 0 20.5V12.5C0 5.87258 5.37258 0.5 12 0.5H20Z"
      fill="#EDE9FE"
    />
    <Path
      d="M20 0.5C26.6274 0.5 32 5.87258 32 12.5V20.5C32 27.1274 26.6274 32.5 20 32.5H12C5.37258 32.5 0 27.1274 0 20.5V12.5C0 5.87258 5.37258 0.5 12 0.5H20Z"
      stroke="#E5E7EB"
    />
    <Path d="M24 28.5H8V5.5H24V28.5Z" stroke="#E5E7EB" />
    <G clipPath="url(#clip0_232_216)">
      <Path
        d="M12.8906 22.4906L12.4969 23.4125C11.9125 23.1156 11.375 22.75 10.8875 22.3219L11.5969 21.6125C11.9875 21.9531 12.4219 22.25 12.8906 22.4906ZM9.26875 17H8.26562C8.30937 17.6625 8.43438 18.3031 8.63125 18.9094L9.5625 18.5375C9.40937 18.0469 9.30625 17.5312 9.26875 17ZM9.26875 16C9.3125 15.4125 9.43125 14.8438 9.61563 14.3094L8.69375 13.9156C8.45938 14.5719 8.3125 15.2719 8.26562 16H9.26875ZM10.0094 13.3906C10.2531 12.925 10.5469 12.4906 10.8875 12.0938L10.1781 11.3844C9.75 11.8719 9.38125 12.4094 9.0875 12.9938L10.0094 13.3906ZM20.4062 21.6125C19.9719 21.9875 19.4875 22.3094 18.9656 22.5625L19.3375 23.4937C19.9844 23.1844 20.5813 22.7875 21.1156 22.3188L20.4062 21.6125ZM11.5938 11.3875C12.0281 11.0125 12.5125 10.6906 13.0344 10.4375L12.6625 9.50625C12.0156 9.81562 11.4188 10.2125 10.8875 10.6813L11.5938 11.3875ZM21.9906 19.6094C21.7469 20.075 21.4531 20.5094 21.1125 20.9062L21.8219 21.6156C22.25 21.1281 22.6188 20.5875 22.9125 20.0063L21.9906 19.6094ZM22.7312 17C22.6875 17.5875 22.5687 18.1562 22.3844 18.6906L23.3062 19.0844C23.5406 18.425 23.6875 17.725 23.7312 16.9969H22.7312V17ZM18.0375 22.9375C17.5469 23.0938 17.0312 23.1937 16.5 23.2312V24.2344C17.1625 24.1906 17.8031 24.0656 18.4094 23.8687L18.0375 22.9375ZM15.5 23.2312C14.9125 23.1875 14.3438 23.0687 13.8094 22.8844L13.4156 23.8062C14.075 24.0406 14.775 24.1875 15.5031 24.2312V23.2312H15.5ZM22.4375 14.4625C22.5938 14.9531 22.6937 15.4688 22.7312 16H23.7344C23.6906 15.3375 23.5656 14.6969 23.3687 14.0906L22.4375 14.4625ZM10.8875 20.9062C10.5125 20.4719 10.1906 19.9875 9.9375 19.4656L9.00625 19.8375C9.31562 20.4844 9.7125 21.0813 10.1813 21.6156L10.8875 20.9062ZM16.5 9.76875C17.0875 9.8125 17.6531 9.93125 18.1906 10.1156L18.5844 9.19375C17.9281 8.95938 17.2281 8.8125 16.5 8.76562V9.76875ZM13.9625 10.0625C14.4531 9.90625 14.9688 9.80625 15.5 9.76875V8.76562C14.8375 8.80937 14.1969 8.93438 13.5906 9.13125L13.9625 10.0625ZM21.8219 11.3844L21.1125 12.0938C21.4875 12.5281 21.8094 13.0125 22.0656 13.5344L22.9969 13.1625C22.6875 12.5156 22.2906 11.9188 21.8219 11.3844ZM20.4062 11.3875L21.1156 10.6781C20.6281 10.25 20.0906 9.88125 19.5063 9.5875L19.1125 10.5094C19.575 10.7531 20.0125 11.0469 20.4062 11.3875Z"
        fill="#7C3AED"
      />
      <Path
        d="M16 20.75C16.4832 20.75 16.875 20.3582 16.875 19.875C16.875 19.3918 16.4832 19 16 19C15.5168 19 15.125 19.3918 15.125 19.875C15.125 20.3582 15.5168 20.75 16 20.75Z"
        fill="#7C3AED"
      />
      <Path
        d="M16.2406 18.25H15.7406C15.5343 18.25 15.3656 18.0813 15.3656 17.875C15.3656 15.6562 17.7843 15.8781 17.7843 14.5062C17.7843 13.8812 17.2281 13.25 15.9906 13.25C15.0812 13.25 14.6062 13.55 14.1406 14.1469C14.0187 14.3031 13.7937 14.3344 13.6343 14.2219L13.2249 13.9344C13.0499 13.8125 13.0093 13.5656 13.1437 13.3969C13.8062 12.5469 14.5937 12 15.9937 12C17.6281 12 19.0374 12.9312 19.0374 14.5062C19.0374 16.6187 16.6187 16.4906 16.6187 17.875C16.6156 18.0813 16.4468 18.25 16.2406 18.25Z"
        fill="#7C3AED"
      />
    </G>
    <Path
      d="M60 0.5C66.6274 0.5 72 5.87258 72 12.5V20.5C72 27.1274 66.6274 32.5 60 32.5H52C45.3726 32.5 40 27.1274 40 20.5V12.5C40 5.87258 45.3726 0.5 52 0.5H60Z"
      stroke="#E5E7EB"
    />
    <G clipPath="url(#clip1_232_216)">
      <Path d="M64 24.5H48V8.5H64V24.5Z" stroke="#E5E7EB" />
      <Path
        d="M49.25 10C48.8344 10 48.5 10.3344 48.5 10.75V12.25C48.5 12.6656 48.8344 13 49.25 13H50.75C51.1656 13 51.5 12.6656 51.5 12.25V10.75C51.5 10.3344 51.1656 10 50.75 10H49.25ZM54 10.5C53.4469 10.5 53 10.9469 53 11.5C53 12.0531 53.4469 12.5 54 12.5H63C63.5531 12.5 64 12.0531 64 11.5C64 10.9469 63.5531 10.5 63 10.5H54ZM54 15.5C53.4469 15.5 53 15.9469 53 16.5C53 17.0531 53.4469 17.5 54 17.5H63C63.5531 17.5 64 17.0531 64 16.5C64 15.9469 63.5531 15.5 63 15.5H54ZM54 20.5C53.4469 20.5 53 20.9469 53 21.5C53 22.0531 53.4469 22.5 54 22.5H63C63.5531 22.5 64 22.0531 64 21.5C64 20.9469 63.5531 20.5 63 20.5H54ZM48.5 15.75V17.25C48.5 17.6656 48.8344 18 49.25 18H50.75C51.1656 18 51.5 17.6656 51.5 17.25V15.75C51.5 15.3344 51.1656 15 50.75 15H49.25C48.8344 15 48.5 15.3344 48.5 15.75ZM49.25 20C48.8344 20 48.5 20.3344 48.5 20.75V22.25C48.5 22.6656 48.8344 23 49.25 23H50.75C51.1656 23 51.5 22.6656 51.5 22.25V20.75C51.5 20.3344 51.1656 20 50.75 20H49.25Z"
        fill="#9CA3AF"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_232_216">
        <Path d="M8 8.5H24V24.5H8V8.5Z" fill="white" />
      </ClipPath>
      <ClipPath id="clip1_232_216">
        <Rect width="16" height="16" fill="white" transform="translate(48 8.5)" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default function CheckInsHistoryScreen({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const [selectedMonth, setSelectedMonth] = useState("Abril 2025")
  const [showMonthPicker, setShowMonthPicker] = useState(false)

  const checkIns = [
    {
      id: "1",
      date: "28 Abril, 2025",
      energy: { level: 6, max: 10 },
      activity: { level: 8, max: 10 },
      mood: "🙂",
    },
    {
      id: "2",
      date: "27 Abril, 2025",
      energy: { level: 7, max: 10 },
      activity: { level: 6, max: 10 },
      mood: "🙂",
    },
    {
      id: "3",
      date: "26 Abril, 2025",
      energy: { level: 7, max: 10 },
      activity: { level: 6, max: 10 },
      mood: "🙂",
    },
    {
      id: "4",
      date: "25 Abril, 2025",
      energy: { level: 5, max: 10 },
      activity: { level: 7, max: 10 },
      mood: "😐",
    },
    {
      id: "5",
      date: "24 Abril, 2025",
      energy: { level: 8, max: 10 },
      activity: { level: 9, max: 10 },
      mood: "😄",
    },
  ]

  const handleViewDetails = (id: string) => {
    console.log(`Viewing details for check-in ${id}`)
    // Aqui você implementaria a navegação para a tela de detalhes do check-in
  }

  if (!visible) return null

  return (
    <Modal animationType="slide" visible={visible} onRequestClose={onClose}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0F4FF" />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <ArrowLeft size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Check Ins</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.monthSelectorContainer}>
          <TouchableOpacity
            style={styles.monthSelector}
            onPress={() => setShowMonthPicker(!showMonthPicker)}
          >
            <Text style={styles.monthSelectorText}>{selectedMonth}</Text>
            <ChevronDown size={20} color="#000" />
          </TouchableOpacity>

          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <HelpCircle size={24} color="#8B5CF6" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <List size={24} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.monthTitleContainer}>
          <Text style={styles.monthTitle}>Abril 2025</Text>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {checkIns.map((checkIn) => (
            <View key={checkIn.id} style={styles.checkInCard}>
              <View style={styles.checkInHeader}>
                <Text style={styles.checkInDate}>{checkIn.date}</Text>
                <Text style={styles.moodEmoji}>{checkIn.mood}</Text>
              </View>

              <View style={styles.metricContainer}>
                <Text style={styles.metricLabel}>Energia</Text>
                <View style={styles.metricRow}>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        {
                          width: `${(checkIn.energy.level / checkIn.energy.max) * 100}%`,
                          backgroundColor: "#10B981",
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.metricValue}>
                    {checkIn.energy.level}/{checkIn.energy.max}
                  </Text>
                </View>
              </View>

              <View style={styles.metricContainer}>
                <Text style={styles.metricLabel}>Atividade</Text>
                <View style={styles.metricRow}>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        {
                          width: `${(checkIn.activity.level / checkIn.activity.max) * 100}%`,
                          backgroundColor: "#60A5FA",
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.metricValue}>
                    {checkIn.activity.level}/{checkIn.activity.max}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => handleViewDetails(checkIn.id)}
              >
                <Text style={styles.detailsButtonText}>Ver detalhes</Text>
                <ArrowLeft
                  size={16}
                  color="#60A5FA"
                  style={{ transform: [{ rotate: "180deg" }] }}
                />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4FF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
    backgroundColor: "#F0F4FF",
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
    fontFamily: "Poppins-SemiBold",
  },
  placeholder: {
    width: 40,
  },
  monthSelectorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  monthSelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  monthSelectorText: {
    fontSize: 16,
    fontWeight: "500",
    marginRight: 10,
    fontFamily: "Poppins-Medium",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
    backgroundColor: "#F3F4F6",
    borderRadius: 20,
  },
  monthTitleContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  monthTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#000",
    fontFamily: "Poppins-SemiBold",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  checkInCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  checkInHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  checkInDate: {
    fontSize: 18,
    fontWeight: "500",
    color: "#4B5563",
    fontFamily: "Poppins-Medium",
  },
  moodEmoji: {
    fontSize: 24,
  },
  metricContainer: {
    marginBottom: 15,
  },
  metricLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#4B5563",
    marginBottom: 8,
    fontFamily: "Poppins-Medium",
  },
  metricRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  progressBar: {
    flex: 1,
    height: 10,
    backgroundColor: "#E5E7EB",
    borderRadius: 5,
    marginRight: 10,
  },
  progressFill: {
    height: "100%",
    borderRadius: 5,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#4B5563",
    width: 50,
    textAlign: "right",
    fontFamily: "Poppins-Medium",
  },
  detailsButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  detailsButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#60A5FA",
    marginRight: 5,
    fontFamily: "Poppins-Medium",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  tabItem: {
    alignItems: "center",
    paddingVertical: 5,
  },
  tabIcon: {
    fontSize: 24,
    marginBottom: 2,
  },
  tabLabel: {
    fontSize: 12,
    color: "#6B7280",
    fontFamily: "Poppins-Regular",
  },
  activeTab: {
    borderTopWidth: 2,
    borderTopColor: "#8B5CF6",
  },
  activeTabLabel: {
    color: "#8B5CF6",
    fontWeight: "500",
    fontFamily: "Poppins-Medium",
  },
})
