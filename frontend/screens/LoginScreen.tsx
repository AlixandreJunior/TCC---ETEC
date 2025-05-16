"use client"

import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Alert,
} from "react-native"
import { router } from "expo-router"
import { Mail, Lock, Eye, EyeOff } from "lucide-react-native"

const { width, height } = Dimensions.get("window")

export function LoginScreen() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isDemo, setIsDemo] = useState(false)

  const handleLogin = () => {
    if (isDemo) {
      // No modo demo, apenas navega para a tela inicial
      router.push("/(tabs)")
      return
    }

    // Validação básica
    if (!email.trim()) {
      Alert.alert("Erro", "Por favor, digite seu email")
      return
    }

    if (!password.trim()) {
      Alert.alert("Erro", "Por favor, digite sua senha")
      return
    }

    // Simulação de login bem-sucedido
    Alert.alert("Sucesso", "Login realizado com sucesso!", [
      { text: "OK", onPress: () => router.push("/(tabs)") },
    ])
  }

  const handleSignup = () => {
    router.push("/signup")
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const toggleDemo = () => {
    setIsDemo(!isDemo)
    if (!isDemo) {
      setEmail("usuario@exemplo.com")
      setPassword("senha123")
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <View style={styles.content}>
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
          <Text style={styles.title}>Entrar</Text>

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

          <View style={styles.inputContainer}>
            <Lock size={20} color="#9CA3AF" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Digite sua senha"
              placeholderTextColor="#9CA3AF"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIcon}>
              {showPassword ? <EyeOff size={20} color="#9CA3AF" /> : <Eye size={20} color="#9CA3AF" />}
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Não tem uma conta? </Text>
            <TouchableOpacity onPress={handleSignup}>
              <Text style={styles.signupLink}>Criar Conta</Text>
            </TouchableOpacity>
          </View>

          {/* Botão de modo demo (pode ser removido em produção) */}
          <TouchableOpacity style={styles.demoButton} onPress={toggleDemo}>
            <Text style={styles.demoButtonText}>
              {isDemo ? "Desativar Modo Demo" : "Ativar Modo Demo"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Sua jornada para uma vida mais{"\n"}saudável começa agora!</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6E6FA",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logoContainer: {
    marginBottom: 30,
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
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Poppins-SemiBold",
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
  eyeIcon: {
    padding: 5,
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: "#9C5DE4",
    fontSize: 14,
    fontFamily: "Poppins-Medium",
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
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signupText: {
    fontSize: 16,
    color: "#4B5563",
    fontFamily: "Poppins-Regular",
  },
  signupLink: {
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

