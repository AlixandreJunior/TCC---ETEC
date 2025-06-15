import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, Alert, } from "react-native"
import { router } from "expo-router"
import { styles } from './styles'
import { Mail, Lock, Eye, EyeOff } from "lucide-react-native"
import { login } from "@/services/auth/login"
import { logout } from "@/services/auth/logout"
import { getDiaryList } from "@/services/diary/list"

export const LoginScreen = () =>  {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = async () => {
    try {
      await login(email, password);
      await getDiaryList()
      router.push("/(tabs)/Mental");
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Erro inesperado ao fazer login.");
    }
  };

  const handleSignup = () => {
    router.push("/signup")
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
        </View>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Sua jornada para uma vida mais{"\n"}saudável começa agora!</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}