import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createAccount } from '@/services/user/createAccount';
import MintroLogo from '@/components/Layout/MintroLogo';
import { EntryFormCard } from '@/components/Cards/EntryFormCard';
import { EntryInput } from '@/components/Inputs/EntryInput';
import { Lock, Mail } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export default function SignUpScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
      await createAccount(name, email, password);
      router.push("/(tabs)/mental");
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Erro inesperado ao fazer login.");
    }
  };

  const handleBackToLogin = () => {
    router.push('/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <MintroLogo />

        <View style={styles.content}>
          <EntryFormCard
            welcomeText='Criar nova conta!'
            subtitleText='Preencha os dados para começar'
            error={error}
            handleSubmit={handleSubmit}
            textSubmit='Criar conta'
            handleBack={handleBackToLogin}
            backText='Já tem uma conta?'
            backLink='Entrar'
          >
            <EntryInput
              labelText='Nome de Usuário'
              keyboardType='default'
              onChange={setName}
              value={name}
              placeholder='Digite seu nome completo'
            />

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
                setShowSecureText: () => setShowPassword(!showPassword),
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
    backgroundColor: '#F8F9F8',
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
