// screens/SignUpScreen.tsx
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import MintroLogo from '@/components/MintroLogo';
import AuthInput from '@/components/AuthInput';
import PasswordInput from '@/components/PasswordInput';
import PrimaryButton from '@/components/PrimaryButton';
import AuthFooterLink from '@/components/AuthFooterLink';
import FormCard from '@/components/FormCard';
import { router } from 'expo-router';

export default function SignUpScreen(){
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleCreateAccount = (): void => {
    console.log('Criar Conta:', { username, email, password });
    alert('Funcionalidade de criar conta ainda não implementada!');
  };

  const handleLoginNavigation = (): void => {
    router.push('/login')
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
              label="Nome de Usuário"
              placeholder="Escolha seu nome de usuário"
              iconName="account-outline"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="words"
            />
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

            <PrimaryButton title={"Criar Conta"} onPress={handleCreateAccount} />

            <AuthFooterLink
              staticText="Já tem uma conta?"
              linkText="Entrar"
              onPressLink={handleLoginNavigation}
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