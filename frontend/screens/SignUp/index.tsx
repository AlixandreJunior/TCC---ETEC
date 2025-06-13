import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Platform, Alert, } from "react-native"
import { router } from "expo-router"
import { Calendar, User, Mail, Image as ImageIcon, ChevronDown, Lock, EyeOff, Eye } from "lucide-react-native"
import { styles } from './styles'
import api from "@/services/api"

export function SignupScreen() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [gender, setGender] = useState("Masculino")
  const [birthDate, setBirthDate] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleCreateAccount = async () => {
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

    try{
      const response = await api.post('user/create/', {username,firstName,lastName,email,gender,birthDate, password})

      if (response.status === 201){
        router.push("/login")
        return
      }

      else {
        console.log("erro ao fazer o login")
      }
    }
    catch{
        console.log("erro ao fazer o login")
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
          <Text style={styles.footerText}>Sua jornada para uma vida mais{"\n"}saudável começa agora!</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
