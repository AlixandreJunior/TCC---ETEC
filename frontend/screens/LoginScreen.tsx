// screens/LoginScreen.tsx
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

import MintroLogo from '@/components/MintroLogo';
import AuthInput from '@/components/AuthInput';
import PasswordInput from '@/components/PasswordInput';
import PrimaryButton from '@/components/PrimaryButton';
import AuthFooterLink from '@/components/AuthFooterLink';
import FormCard from '@/components/FormCard';
import { router } from 'expo-router';
import { saveToken } from '@/stores/authStore';
import { login } from '@/services/auth/login';

export default function LoginScreen(){
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    try {
          const data = await login(email, password);
          saveToken(data.access, data.refresh)
          router.push("/(tabs)/mental");
        } catch (error: any) {
          Alert.alert("Erro", error.message || "Erro inesperado ao fazer login.");
        }
  };

  const handleCreateAccountNavigation = (): void => {
    router.push('/signup')
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.container}>
          <MintroLogo />

          <FormCard>
            <AuthInput
              label="Email"
              placeholder="Digite seu email"
              iconName="email-outline"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <PasswordInput
              label="Senha"
              placeholder="Digite sua senha"
              value={password}
              onChangeText={setPassword}
            />

            <PrimaryButton title="Entrar" onPress={handleLogin} />

            <AuthFooterLink
              staticText="Não tem uma conta?"
              linkText="Criar agora"
              onPressLink={handleCreateAccountNavigation}
            />
          </FormCard>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#F5F5F5',
  },
});