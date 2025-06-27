import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { createAccount } from '@/services/user/createAccount';

const { width, height } = Dimensions.get('window');

export default function SignUpScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    setError('');
    
    if (!name.trim()) {
      setError('Nome é obrigatório');
      return;
    }
    
    if (!email.trim()) {
      setError('Email é obrigatório');
      return;
    }
    
    if (password.length < 6) {
      setError('Senha deve ter pelo menos 6 caracteres');
      return;
    }

    try {
      const data = await createAccount(name, email, password);
      router.push("/(tabs)/mental");
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Erro inesperado ao fazer login.");
    }
  };

  const handleBackToLogin = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackToLogin} style={styles.backButton}>
            <ArrowLeft size={24} color="#6B7280" />
          </TouchableOpacity>
          
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/images/logosrobomintro.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
          
          <View style={styles.spacer} />
        </View>

        <View style={styles.content}>
          <View style={styles.formCard}>
            <Text style={styles.welcomeText}>Criar nova conta</Text>
            <Text style={styles.subtitleText}>Preencha os dados para começar</Text>

            {error ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nome completo</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite seu nome completo"
                placeholderTextColor="#C7C7CD"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
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

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Senha</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite sua senha"
                placeholderTextColor="#C7C7CD"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
              />
            </View>

            <TouchableOpacity style={styles.signUpButton} onPress={handleSubmit}>
              <Text style={styles.signUpButtonText}>Criar conta</Text>
            </TouchableOpacity>


            <View style={styles.backToLoginContainer}>
              <Text style={styles.backToLoginText}>Já tem uma conta? </Text>
              <TouchableOpacity onPress={handleBackToLogin}>
                <Text style={styles.backToLoginLink}>Entrar</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.testButton} onPress={() => router.push('/mental')}>
              <Text style={styles.testButtonText}>🧪 Teste - Ver Dashboard</Text>
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
    backgroundColor: '#F8F9F8',
  },
  scrollContent: {
    flexGrow: 1,
    minHeight: height,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.02,
    paddingBottom: height * 0.01,
    minHeight: height * 0.12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: Math.min(width * 0.35, 140),
    height: Math.min(width * 0.35, 140),
  },
  spacer: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: width * 0.06,
    paddingBottom: height * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: width * 0.08,
    paddingVertical: height * 0.05,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 12,
    width: '100%',
    maxWidth: width * 0.9,
    minWidth: width * 0.85,
  },
  welcomeText: {
    fontSize: width * 0.06,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: width * 0.04,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: height * 0.04,
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
    fontSize: width * 0.035,
    fontWeight: '500',
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: height * 0.025,
  },
  label: {
    fontSize: width * 0.04,
    color: '#6B7280',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: height * 0.02,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minHeight: height * 0.065,
    fontSize: width * 0.04,
    color: '#374151',
    fontWeight: '400',
  },
  signUpButton: {
    backgroundColor: '#79D457',
    borderRadius: 16,
    paddingVertical: height * 0.022,
    alignItems: 'center',
    marginTop: height * 0.02,
    marginBottom: height * 0.02,
    shadowColor: '#79D457',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    minHeight: height * 0.06,
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontSize: width * 0.045,
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
  backToLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  backToLoginText: {
    fontSize: width * 0.04,
    color: '#6B7280',
    fontWeight: '400',
  },
  backToLoginLink: {
    fontSize: width * 0.04,
    color: '#79D457',
    fontWeight: '600',
  },
});
