import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import { Mail, Lock } from 'lucide-react-native';
import { router } from 'expo-router';
import { login } from '@/services/auth/login';
import { saveToken } from '@/stores/authStore';
import MintroLogo from '@/components/Layout/MintroLogo';
import { EntryFormCard } from '@/components/Cards/EntryFormCard';
import { EntryInput } from '@/components/Inputs/EntryInput';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const data = await login(email, password);
      saveToken(data.access, data.refresh);
      router.push("/(tabs)/mental");
    } catch (error: any) {
      setError(error.message);
      Alert.alert("Erro", error.message || "Erro inesperado ao fazer login.");
    }
  };

  const handleCreateAccount = () => {
    router.push('/signup');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <MintroLogo />
        <View style={styles.content}>
          <EntryFormCard
            welcomeText='Bem-vindo de volta!'
            subtitleText='Entre na sua conta para continuar'
            error={error}
            handleSubmit={handleLogin}
            textSubmit='Entrar'
            handleBack={handleCreateAccount}
            backText='Não tem uma conta?'
            backLink='Criar conta'
          >
            <EntryInput
              labelText='Email'
              keyboardType='email-address'
              onChange={setEmail}
              value={email}
              placeholder='Digite seu email'
              icon={<Mail size={20} color="#9CA3AF" style={styles.inputIcon} />}
            />

            <EntryInput
              labelText='Senha'
              keyboardType='default'
              onChange={setPassword}
              value={password}
              placeholder='Digite sua senha'
              secureText={{
                showSecureText: showPassword,
                setShowSecureText: () => setShowPassword(!showPassword)
              }}
              icon={<Lock size={20} color="#9CA3AF" style={styles.inputIcon} />}
            />
          </EntryFormCard>
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
  content: {
    flex: 1,
    paddingHorizontal: width * 0.06,
    paddingBottom: height * 0.05, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputIcon: {
    marginRight: 12,
  },
});
