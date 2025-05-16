"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Modal } from "react-native"
import { ArrowLeft, Check, Edit3 } from "lucide-react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Svg, { Path } from "react-native-svg"

// SVG Icon Components
const LonelyIcon = () => (
  <Svg width="25" height="18" viewBox="0 0 25 18" fill="none">
    <Path
      d="M2.8125 2.4375C2.8125 1.85734 3.04297 1.30094 3.4532 0.890704C3.86344 0.480468 4.41984 0.25 5 0.25C5.58016 0.25 6.13656 0.480468 6.5468 0.890704C6.95703 1.30094 7.1875 1.85734 7.1875 2.4375C7.1875 3.01766 6.95703 3.57406 6.5468 3.9843C6.13656 4.39453 5.58016 4.625 5 4.625C4.41984 4.625 3.86344 4.39453 3.4532 3.9843C3.04297 3.57406 2.8125 3.01766 2.8125 2.4375ZM2.5 8.59766C2.10938 9.03516 1.875 9.61719 1.875 10.25C1.875 10.8828 2.10938 11.4648 2.5 11.9023V8.59766ZM8.14062 6.67188C6.98047 7.69922 6.25 9.20312 6.25 10.875C6.25 12.2148 6.71875 13.4453 7.5 14.4102V15.25C7.5 15.9414 6.94141 16.5 6.25 16.5H3.75C3.05859 16.5 2.5 15.9414 2.5 15.25V14.2031C1.02344 13.5 0 11.9961 0 10.25C0 7.83203 1.95703 5.875 4.375 5.875H5.625C6.5625 5.875 7.42969 6.16797 8.14062 6.66797V6.67188ZM17.5 15.25V14.4102C18.2812 13.4453 18.75 12.2148 18.75 10.875C18.75 9.20312 18.0195 7.69922 16.8594 6.66797C17.5703 6.16797 18.4375 5.875 19.375 5.875H20.625C23.043 5.875 25 7.83203 25 10.25C25 11.9961 23.9766 13.5 22.5 14.2031V15.25C22.5 15.9414 21.9414 16.5 21.25 16.5H18.75C18.0586 16.5 17.5 15.9414 17.5 15.25ZM17.8125 2.4375C17.8125 1.85734 18.043 1.30094 18.4532 0.890704C18.8634 0.480468 19.4198 0.25 20 0.25C20.5802 0.25 21.1366 0.480468 21.5468 0.890704C21.957 1.30094 22.1875 1.85734 22.1875 2.4375C22.1875 3.01766 21.957 3.57406 21.5468 3.9843C21.1366 4.39453 20.5802 4.625 20 4.625C19.4198 4.625 18.8634 4.39453 18.4532 3.9843C18.043 3.57406 17.8125 3.01766 17.8125 2.4375ZM22.5 8.59766V11.9062C22.8906 11.4648 23.125 10.8867 23.125 10.2539C23.125 9.62109 22.8906 9.03906 22.5 8.60156V8.59766ZM12.5 0.25C13.163 0.25 13.7989 0.513392 14.2678 0.982233C14.7366 1.45107 15 2.08696 15 2.75C15 3.41304 14.7366 4.04893 14.2678 4.51777C13.7989 4.98661 13.163 5.25 12.5 5.25C11.837 5.25 11.2011 4.98661 10.7322 4.51777C10.2634 4.04893 10 3.41304 10 2.75C10 2.08696 10.2634 1.45107 10.7322 0.982233C11.2011 0.513392 11.837 0.25 12.5 0.25ZM9.375 10.875C9.375 11.5078 9.60938 12.0859 10 12.5273V9.22266C9.60938 9.66406 9.375 10.2422 9.375 10.875ZM15 9.22266V12.5312C15.3906 12.0898 15.625 11.5117 15.625 10.8789C15.625 10.2461 15.3906 9.66406 15 9.22656V9.22266ZM17.5 10.875C17.5 12.6211 16.4766 14.125 15 14.8281V16.5C15 17.1914 14.4414 17.75 13.75 17.75H11.25C10.5586 17.75 10 17.1914 10 16.5V14.8281C8.52344 14.125 7.5 12.6211 7.5 10.875C7.5 8.45703 9.45703 6.5 11.875 6.5H13.125C15.543 6.5 17.5 8.45703 17.5 10.875Z"
      fill="#8B5CF6"
    />
  </Svg>
)

const LowSelfEsteemIcon = () => (
  <Svg width="20" height="18" viewBox="0 0 20 18" fill="none">
    <Path
      d="M4.66406 0.72254C5.57422 0.570196 6.49219 0.648321 7.34375 0.929571L9.28906 3.95691L6.34375 6.90223C6.28516 6.96082 6.25 7.04285 6.25391 7.12879C6.25781 7.21473 6.29297 7.29285 6.35547 7.35145L10.7305 11.4139C10.8438 11.5194 11.0195 11.5272 11.1406 11.4257C11.2617 11.3241 11.2891 11.1522 11.207 11.0194L8.84766 7.18738L12.3906 4.23426C12.4922 4.15223 12.5273 4.0116 12.4844 3.89051L11.5938 1.41395C12.707 0.761602 14.0312 0.507696 15.332 0.726446C18.0273 1.17176 20 3.49988 20 6.23035V6.45691C20 8.07801 19.3281 9.62879 18.1406 10.7343L11.082 17.3241C10.7891 17.5975 10.4023 17.7499 10 17.7499C9.59766 17.7499 9.21094 17.5975 8.91797 17.3241L1.85938 10.7343C0.671875 9.62879 0 8.07801 0 6.45691V6.23035C0 3.49988 1.97266 1.17176 4.66406 0.72254Z"
      fill="#8B5CF6"
    />
  </Svg>
)

const OverwhelmedIcon = () => (
  <Svg width="18" height="20" viewBox="0 0 18 20" fill="none">
    <Path
      d="M3.75 0C1.67969 0 0 1.67969 0 3.75V16.25C0 18.3203 1.67969 20 3.75 20H15H16.25C16.9414 20 17.5 19.4414 17.5 18.75C17.5 18.0586 16.9414 17.5 16.25 17.5V15C16.9414 15 17.5 14.4414 17.5 13.75V1.25C17.5 0.558594 16.9414 0 16.25 0H15H3.75ZM3.75 15H13.75V17.5H3.75C3.05859 17.5 2.5 16.9414 2.5 16.25C2.5 15.5586 3.05859 15 3.75 15ZM5 5.625C5 5.28125 5.28125 5 5.625 5H13.125C13.4688 5 13.75 5.28125 13.75 5.625C13.75 5.96875 13.4688 6.25 13.125 6.25H5.625C5.28125 6.25 5 5.96875 5 5.625ZM5.625 7.5H13.125C13.4688 7.5 13.75 7.78125 13.75 8.125C13.75 8.46875 13.4688 8.75 13.125 8.75H5.625C5.28125 8.75 5 8.46875 5 8.125C5 7.78125 5.28125 7.5 5.625 7.5Z"
      fill="#8B5CF6"
    />
  </Svg>
)

const OtherFeelingIcon = () => (
  <Svg width="17" height="18" viewBox="0 0 17 18" fill="none">
    <Path
      d="M10 2.125C10 1.43359 9.44141 0.875 8.75 0.875C8.05859 0.875 7.5 1.43359 7.5 2.125V7.75H1.875C1.18359 7.75 0.625 8.30859 0.625 9C0.625 9.69141 1.18359 10.25 1.875 10.25H7.5V15.875C7.5 16.5664 8.05859 17.125 8.75 17.125C9.44141 17.125 10 16.5664 10 15.875V10.25H15.625C16.3164 10.25 16.875 9.69141 16.875 9C16.875 8.30859 16.3164 7.75 15.625 7.75H10V2.125Z"
      fill="#8B5CF6"
    />
  </Svg>
)

// Stress and Anxiety Icons
const StressIcon = () => (
  <Svg width="14" height="16" viewBox="0 0 14 16" fill="none" >
    <Path d="M4.97813 0.168807C5.22188 -0.0593181 5.6 -0.0561931 5.84375 0.171932C6.70625 0.981307 7.51563 1.85318 8.27188 2.79693C8.61563 2.34693 9.00625 1.85631 9.42813 1.45631C9.675 1.22506 10.0563 1.22506 10.3031 1.45943C11.3844 2.49068 12.3 3.85318 12.9438 5.14693C13.5781 6.42193 14 7.72506 14 8.64381C14 12.6313 10.8813 16.0001 7 16.0001C3.075 16.0001 0 12.6282 0 8.64068C0 7.44068 0.55625 5.97506 1.41875 4.52506C2.29063 3.05318 3.52188 1.51881 4.97813 0.168807ZM7.05312 13.0001C7.84375 13.0001 8.54375 12.7813 9.20312 12.3438C10.5188 11.4251 10.8719 9.58756 10.0813 8.14381C9.94063 7.86256 9.58125 7.84381 9.37813 8.08131L8.59062 8.99693C8.38437 9.23443 8.0125 9.22818 7.81875 8.98131C7.30312 8.32506 6.38125 7.15318 5.85625 6.48756C5.65937 6.23756 5.28437 6.23443 5.08437 6.48443C4.02812 7.81256 3.49688 8.65006 3.49688 9.59068C3.5 11.7313 5.08125 13.0001 7.05312 13.0001Z" fill="#EF4444" />
  </Svg>
)

const AnxietyIcon = () => (
  <Svg width="16" height="14" viewBox="0 0 16 14" fill="none">
    <Path
      d="M7.13438 13.6593L1.4875 8.38742C1.35625 8.26555 1.23125 8.1343 1.11563 7.99992H3.83437C4.54063 7.99992 5.17812 7.57492 5.45 6.9218L5.77812 6.1343L7.31875 9.55617C7.4375 9.8218 7.69688 9.99367 7.9875 9.9968C8.27812 9.99992 8.54375 9.84055 8.675 9.58117L10 6.92805L10.0531 7.0343C10.35 7.62805 10.9562 8.00305 11.6187 8.00305H14.8844C14.7687 8.13742 14.6438 8.26867 14.5125 8.39055L8.86563 13.6593C8.63125 13.878 8.32187 13.9999 8 13.9999C7.67812 13.9999 7.36875 13.878 7.13438 13.6593ZM15.7406 6.49992H11.6156C11.5219 6.49992 11.4344 6.4468 11.3906 6.36242L10.6656 4.91555C10.5375 4.66242 10.2781 4.49992 9.99375 4.49992C9.70937 4.49992 9.45 4.6593 9.32187 4.91555L8.02812 7.50305L6.43437 3.94367C6.3125 3.6718 6.0375 3.4968 5.74062 3.50305C5.44375 3.5093 5.175 3.68742 5.05937 3.96555L4.06563 6.34992C4.02813 6.44367 3.93437 6.50305 3.83437 6.50305H0.5C0.41875 6.50305 0.34375 6.51555 0.271875 6.53742C0.09375 6.03742 0 5.50617 0 4.96555V4.7843C0 2.59992 1.57812 0.737423 3.73125 0.378048C5.15625 0.140548 6.60625 0.606173 7.625 1.62492L8 1.99992L8.375 1.62492C9.39375 0.606173 10.8438 0.140548 12.2688 0.378048C14.4219 0.737423 16 2.59992 16 4.7843V4.96555C16 5.49367 15.9125 6.01242 15.7406 6.49992Z"
      fill="#8B5CF6"
    />
  </Svg>
)

export default function FisicoCheckinScreen({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const insets = useSafeAreaInsets()
  const [stressLevel, setStressLevel] = useState(40)
  const [anxietyLevel, setAnxietyLevel] = useState(30)
  const [selectedSleep, setSelectedSleep] = useState<string | null>(null)
  const [selectedNutrition, setSelectedNutrition] = useState<string | null>(null)
  const [selectedFeelings, setSelectedFeelings] = useState<string[]>([])
  const [notes, setNotes] = useState("")

  const sleepOptions = [
    { id: "easy", label: "Fácil", color: "#D8B4FE" },
    { id: "moderate", label: "Moderado", color: "#A3E635" },
    { id: "difficult", label: "Difícil", color: "#EF4444" },
  ]

  const nutritionOptions = [
    { id: "easy", label: "Fácil", color: "#D8B4FE" },
    { id: "moderate", label: "Moderado", color: "#A3E635" },
    { id: "difficult", label: "Difícil", color: "#EF4444" },
  ]

  const feelings = [
    { id: "lonely", icon: <LonelyIcon />, label: "Me sentindo\nsozinho(a)" },
    { id: "lowSelfEsteem", icon: <LowSelfEsteemIcon />, label: "Autoestima\nbaixa" },
    { id: "overwhelmed", icon: <OverwhelmedIcon />, label: "Sobrecarregado(a)" },
    { id: "other", icon: <OtherFeelingIcon />, label: "Outro\nsentimento" },
  ]

  const toggleFeeling = (id: string) => {
    if (selectedFeelings.includes(id)) {
      setSelectedFeelings(selectedFeelings.filter((feeling) => feeling !== id))
    } else {
      setSelectedFeelings([...selectedFeelings, id])
    }
  }

  const handleSubmit = () => {
    // Here you would save the check-in data
    console.log({
      stressLevel,
      anxietyLevel,
      selectedSleep,
      selectedNutrition,
      selectedFeelings,
      notes,
    })
    onClose()
  }

  if (!visible) return null

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.blurBackground} />
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <ArrowLeft size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Check In Físico</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <Text style={styles.questionTitle}>E os seus níveis de stress e ansiedade?</Text>

            <View style={styles.levelsContainer}>
              <View style={styles.levelCard}>
                <View style={styles.levelHeader}>
                  <StressIcon />
                  <Text style={styles.levelTitle}>Stress</Text>
                </View>
                <View style={styles.sliderContainer}>
                  <View style={styles.slider}>
                    <View style={styles.sliderTrack}>
                      <View
                        style={[
                          styles.sliderFill,
                          {
                            width: `${stressLevel}%`,
                            backgroundColor: "#FF6B6B",
                          },
                        ]}
                      />
                      <View style={[styles.sliderThumb, { left: `${stressLevel}%` }]} />
                    </View>
                  </View>
                </View>
                <Text style={styles.levelLabel}>Nível moderado</Text>
              </View>

              <View style={styles.levelCard}>
                <View style={styles.levelHeader}>
                  <AnxietyIcon />
                  <Text style={styles.levelTitle}>Ansiedade</Text>
                </View>
                <View style={styles.sliderContainer}>
                  <View style={styles.slider}>
                    <View style={styles.sliderTrack}>
                      <View
                        style={[
                          styles.sliderFill,
                          {
                            width: `${anxietyLevel}%`,
                            backgroundColor: "#9C5DE4",
                          },
                        ]}
                      />
                      <View style={[styles.sliderThumb, { left: `${anxietyLevel}%` }]} />
                    </View>
                  </View>
                </View>
                <Text style={styles.levelLabel}>Nível baixo</Text>
              </View>
            </View>

            <Text style={styles.questionTitle}>Como foi seu sono?</Text>

            <View style={styles.optionsContainer}>
              {sleepOptions.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.optionButton,
                    { backgroundColor: option.color },
                    selectedSleep === option.id && styles.selectedOption,
                  ]}
                  onPress={() => setSelectedSleep(option.id)}
                >
                  <Text style={styles.optionText}>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.questionTitle}>Como foi sua alimentação?</Text>

            <View style={styles.optionsContainer}>
              {nutritionOptions.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.optionButton,
                    { backgroundColor: option.color },
                    selectedNutrition === option.id && styles.selectedOption,
                  ]}
                  onPress={() => setSelectedNutrition(option.id)}
                >
                  <Text style={styles.optionText}>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.questionTitle}>Você está sentindo algum desses hoje?</Text>

            <View style={styles.feelingsContainer}>
              {feelings.map((feeling) => (
                <TouchableOpacity
                  key={feeling.id}
                  style={[styles.feelingCard, selectedFeelings.includes(feeling.id) && styles.selectedFeelingCard]}
                  onPress={() => toggleFeeling(feeling.id)}
                >
                  <View style={styles.feelingIcon}>{feeling.icon}</View>
                  <Text style={styles.feelingLabel}>{feeling.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.questionTitle}>Quer contar mais? (opcional)</Text>

            <View style={styles.notesContainer}>
              <TextInput
                style={styles.notesInput}
                placeholder="Escreva seus pensamentos aqui..."
                placeholderTextColor="#A0A0A0"
                multiline
                textAlignVertical="top"
                value={notes}
                onChangeText={setNotes}
              />
              <TouchableOpacity style={styles.editIcon}>
                <Edit3 size={20} color="#A0A0A0" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Finalizar Meu Check-In</Text>
              <Check size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "transparent",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
    backgroundColor: "#E4F0F6",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    zIndex: 10,
  },
  scrollView: {
    flex: 1,
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
  blurBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(100, 100, 100, 0.85)",
  },
  placeholder: {
    width: 40,
  },
  content: {
    padding: 20,
  },
  questionTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#FFF",
    marginTop: 30,
    marginBottom: 20,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  levelsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  levelCard: {
    width: "48%",
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 15,
  },
  levelHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  levelTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginLeft: 10,
  },
  sliderContainer: {
    marginBottom: 10,
  },
  slider: {
    height: 20,
    justifyContent: "center",
  },
  sliderTrack: {
    height: 6,
    backgroundColor: "#E5E7EB",
    borderRadius: 3,
    position: "relative",
  },
  sliderFill: {
    height: 6,
    borderRadius: 3,
    position: "absolute",
  },
  sliderThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#FFF",
    borderWidth: 2,
    borderColor: "#60A5FA",
    position: "absolute",
    top: -7,
    marginLeft: -10,
  },
  levelLabel: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  optionButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  selectedOption: {
    borderWidth: 2,
    borderColor: "#60A5FA",
  },
  optionText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  feelingsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  feelingCard: {
    width: "48%",
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    alignItems: "center",
    flexDirection: "row",
  },
  selectedFeelingCard: {
    borderWidth: 2,
    borderColor: "#60A5FA",
  },
  feelingIcon: {
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  feelingLabel: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
    flexShrink: 1,
  },
  notesContainer: {
    backgroundColor: "#FFF9E5",
    borderRadius: 15,
    padding: 15,
    marginBottom: 30,
    position: "relative",
  },
  notesInput: {
    minHeight: 100,
    fontSize: 16,
    color: "#333",
    paddingRight: 40,
  },
  editIcon: {
    position: "absolute",
    top: 15,
    right: 15,
  },
  submitButton: {
    backgroundColor: "#9C5DE4",
    borderRadius: 30,
    padding: 15,
    alignItems: "center",
    marginBottom: 30,
    flexDirection: "row",
    justifyContent: "center",
  },
  submitButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
    marginRight: 10,
  },
})
