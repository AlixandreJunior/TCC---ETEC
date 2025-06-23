import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import { Mail, Eye, EyeOff, Lock } from 'lucide-react-native';
import { router, useRouter } from 'expo-router';
import { login } from '@/services/auth/login';
import { saveToken } from '@/stores/authStore';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
          const data = await login(email, password);
          saveToken(data.access, data.refresh)
          router.push("/(tabs)/mental");
        } catch (error: any) {
          Alert.alert("Erro", error.message || "Erro inesperado ao fazer login.");
        }
  };

  const handleCreateAccount = () => {
    router.push('/signup');
  };

  const handleForgotPassword = () => {
    console.log('Esqueci minha senha');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/images/logosrobomintro.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.formCard}>
            <Text style={styles.welcomeText}>Bem-vindo de volta!</Text>
            <Text style={styles.subtitleText}>Entre na sua conta para continuar</Text>

            {error ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputContainer}>
                <Mail size={20} color="#9CA3AF" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Digite seu email"
                  placeholderTextColor="#C7C7CD"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Senha</Text>
              <View style={styles.inputContainer}>
                <Lock size={20} color="#9CA3AF" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Digite sua senha"
                  placeholderTextColor="#C7C7CD"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  {showPassword ? (
                    <EyeOff size={20} color="#9CA3AF" />
                  ) : (
                    <Eye size={20} color="#9CA3AF" />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPasswordContainer}>
              <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Entrar</Text>
            </TouchableOpacity>

            <View style={styles.createAccountContainer}>
              <Text style={styles.createAccountText}>Não tem uma conta? </Text>
              <TouchableOpacity onPress={handleCreateAccount}>
                <Text style={styles.createAccountLink}>Criar conta</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.testButton} onPress={() => router.push("/mental")}>
              <Text style={styles.testButtonText}>🧪 Teste - Ver Atividades</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9f8',
  },
  scrollContent: {
    flexGrow: 1,
    minHeight: height,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: width * 0.05, 
    paddingTop: height * 0.08,
    paddingBottom: height * 0.02,
    minHeight: height * 0.25, 
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: Math.min(width * 0.5, 200), 
    height: Math.min(width * 0.5, 200), // Mantém proporção quadrada
  },
  content: {
    flex: 1,
    paddingHorizontal: width * 0.06, // 6% da largura da tela
    paddingBottom: height * 0.05, // 5% da altura da tela
    alignItems: 'center',
    justifyContent: 'center',
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: width * 0.08, // 8% da largura da tela
    paddingVertical: height * 0.05, // 5% da altura da tela
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 12,
    width: '100%',
    maxWidth: width * 0.9, // 90% da largura máxima
    minWidth: width * 0.85, // 85% da largura mínima
  },
  welcomeText: {
    fontSize: width * 0.065, // 6.5% da largura da tela
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: width * 0.04, // 4% da largura da tela
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: height * 0.04, // 4% da altura da tela
  },
  errorContainer: {
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    padding: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  errorText: {
    color: '#DC2626',
    fontSize: width * 0.035, // 3.5% da largura da tela
    fontWeight: '500',
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: height * 0.025, // 2.5% da altura da tela
  },
  label: {
    fontSize: width * 0.04, // 4% da largura da tela
    color: '#6B7280',
    marginBottom: 8,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: height * 0.02, // 2% da altura da tela
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minHeight: height * 0.065, // 6.5% da altura da tela
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: width * 0.04, // 4% da largura da tela
    color: '#374151',
    fontWeight: '400',
  },
  eyeIcon: {
    padding: 4,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: height * 0.02, // 2% da altura da tela
  },
  forgotPasswordText: {
    fontSize: width * 0.035, // 3.5% da largura da tela
    color: '#79D457',
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#79D457',
    borderRadius: 16,
    paddingVertical: height * 0.022, // 2.2% da altura da tela
    alignItems: 'center',
    marginTop: height * 0.02, // 2% da altura da tela
    marginBottom: height * 0.03, // 3% da altura da tela
    shadowColor: '#79D457',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    minHeight: height * 0.06, // 6% da altura da tela
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: width * 0.045, // 4.5% da largura da tela
    fontWeight: '600',
  },
  createAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap', // Permite quebra de linha em telas muito pequenas
  },
  createAccountText: {
    fontSize: width * 0.04, // 4% da largura da tela
    color: '#6B7280',
    fontWeight: '400',
  },
  createAccountLink: {
    fontSize: width * 0.04, // 4% da largura da tela
    color: '#79D457',
    fontWeight: '600',
  },
  testButton: {
    borderRadius: 16,
    alignItems: "center",
    marginBottom: height * 0.02,
    marginTop: height * 0.02,
  },
  testButtonText: {
    color: "#79D457",
    fontSize: width * 0.04,
    fontWeight: "600",
  },
});