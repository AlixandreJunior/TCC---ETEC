"use client"

import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Alert,
} from "react-native"
import { router } from "expo-router"
import { Calendar, User, Mail, Image as ImageIcon, ChevronDown } from "lucide-react-native"

const { width, height } = Dimensions.get("window")

export function SignupScreen() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [gender, setGender] = useState("")
  const [birthDate, setBirthDate] = useState("")
  const [avatarUri, setAvatarUri] = useState<string | null>(null)
  const [isDemo, setIsDemo] = useState(false)

  const handleCreateAccount = () => {
    if (isDemo) {
      // No modo demo, apenas navega para a tela inicial
      router.push("/(tabs)")
      return
    }

    // Validação básica
    if (!firstName.trim() || !lastName.trim()) {
      Alert.alert("Erro", "Por favor, preencha seu nome e sobrenome")
      return
    }

    if (!username.trim()) {
      Alert.alert("Erro", "Por favor, escolha um nome de usuário")
      return
    }

    if (!email.trim()) {
      Alert.alert("Erro", "Por favor, digite seu email")
      return
    }

    // Simulação de cadastro bem-sucedido
    Alert.alert("Sucesso", "Conta criada com sucesso!", [{ text: "OK", onPress: () => router.push("/(tabs)") }])
  }

  const handleLogin = () => {
    router.push("/login")
  }

  const handleChoosePhoto = () => {
    // Implementar seleção de foto
    Alert.alert("Selecionar foto", "Esta funcionalidade será implementada em breve.")
  }

  const toggleDemo = () => {
    setIsDemo(!isDemo)
    if (!isDemo) {
      setFirstName("João")
      setLastName("Silva")
      setUsername("joaosilva")
      setEmail("joao.silva@exemplo.com")
      setGender("Masculino")
      setBirthDate("01/01/1990")
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.logoContainer}>
          <Image
            source={{
              uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6HeidDA43Sm6pqoG0TL4Jkz7yrdKeG.png",
            }}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.card}>
          <View style={styles.nameRow}>
            <View style={styles.inputContainerHalf}>
              <ImageIcon size={20} color="#9CA3AF" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Nome"
                placeholderTextColor="#9CA3AF"
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>

            <View style={styles.inputContainerHalf}>
              <TextInput
                style={styles.input}
                placeholder="Sobrenome"
                placeholderTextColor="#9CA3AF"
                value={lastName}
                onChangeText={setLastName}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <User size={20} color="#9CA3AF" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Escolha seu nome de usuário"
              placeholderTextColor="#9CA3AF"
              value={username}
              onChangeText={setUsername}
            />
          </View>

          <View style={styles.inputContainer}>
            <Mail size={20} color="#9CA3AF" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Digite seu email"
              placeholderTextColor="#9CA3AF"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.rowContainer}>
            <TouchableOpacity style={styles.inputContainerHalf}>
              <View style={styles.dropdownContainer}>
                <Text style={[styles.input, !gender ? styles.placeholder : null]}>{gender || "Seu gênero"}</Text>
                <ChevronDown size={20} color="#9CA3AF" />
              </View>
            </TouchableOpacity>

            <View style={styles.inputContainerHalf}>
              <Calendar size={20} color="#9CA3AF" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Data de nascimento"
                placeholderTextColor="#9CA3AF"
                value={birthDate}
                onChangeText={setBirthDate}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.photoContainer} onPress={handleChoosePhoto}>
            <View style={styles.photoPlaceholder}>
              <ImageIcon size={32} color="#9CA3AF" />
            </View>
            <Text style={styles.photoText}>Escolher Foto</Text>
            <Text style={styles.photoSubtext}>Clique para adicionar um avatar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
            <Text style={styles.buttonText}>Criar Conta</Text>
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Já tem uma conta? </Text>
            <TouchableOpacity onPress={handleLogin}>
              <Text style={styles.loginLink}>Entrar</Text>
            </TouchableOpacity>
          </View>

          {/* Botão de modo demo (pode ser removido em produção) */}
          <TouchableOpacity style={styles.demoButton} onPress={toggleDemo}>
            <Text style={styles.demoButtonText}>{isDemo ? "Desativar Modo Demo" : "Ativar Modo Demo"}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Sua jornada para uma vida mais{"\n"}saudável começa agora!</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6E6FA",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 40,
  },
  logoContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  logo: {
    width: 280,
    height: 60,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: width * 0.9,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputContainerHalf: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    height: 50,
    width: "48%",
    backgroundColor: "white",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    height: 50,
    backgroundColor: "white",
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#1F2937",
    fontFamily: "Poppins-Regular",
  },
  placeholder: {
    color: "#9CA3AF",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dropdownContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingLeft: 10,
  },
  photoContainer: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderStyle: "dashed",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    marginVertical: 10,
  },
  photoPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  photoText: {
    fontSize: 18,
    color: "#9C5DE4",
    fontWeight: "600",
    marginBottom: 5,
    fontFamily: "Poppins-SemiBold",
  },
  photoSubtext: {
    fontSize: 14,
    color: "#6B7280",
    fontFamily: "Poppins-Regular",
  },
  button: {
    backgroundColor: "#9C5DE4",
    borderRadius: 100,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  loginText: {
    fontSize: 16,
    color: "#4B5563",
    fontFamily: "Poppins-Regular",
  },
  loginLink: {
    fontSize: 16,
    color: "#9C5DE4",
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
  },
  footerContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  footerText: {
    fontSize: 18,
    color: "#6B7280",
    textAlign: "center",
    fontFamily: "Poppins-Medium",
  },
  demoButton: {
    marginTop: 15,
    padding: 10,
    alignItems: "center",
  },
  demoButtonText: {
    fontSize: 14,
    color: "#9C5DE4",
    fontFamily: "Poppins-Medium",
  },
})
