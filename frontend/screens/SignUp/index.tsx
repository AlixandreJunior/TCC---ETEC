import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native"
import { router } from "expo-router"
import {
  Calendar,
  User,
  Mail,
  Image as ImageIcon,
  ChevronDown,
  Lock,
  EyeOff,
  Eye,
} from "lucide-react-native"
import { styles } from "./styles"
import { createAccount } from "@/services/user/createAccount"
import { getUser } from "@/services/user/getUser"

const genderOptions = [
  "Masculino",
  "Feminino",
  "Outro",
  "Prefiro não dizer",
]

export function SignupScreen() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleCreateAccount = async () => {
    try{
      console.log('a')
      await createAccount(username, firstName, lastName, email, password)
      await getUser()
      router.push("/login")
    }
    catch (error: any){
      console.log('a')
      Alert.alert("Erro", error.message || "Erro inesperado ao fazer login.");
    }
  }

  const handleLogin = () => {
    router.push("/login")
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
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
              {showPassword ? (
                <EyeOff size={20} color="#9CA3AF" />
              ) : (
                <Eye size={20} color="#9CA3AF" />
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
            <Text style={styles.buttonText}>Criar Conta</Text>
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Já tem uma conta? </Text>
            <TouchableOpacity onPress={handleLogin}>
              <Text style={styles.loginLink}>Entrar</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            Sua jornada para uma vida mais{"\n"}saudável começa agora!
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}