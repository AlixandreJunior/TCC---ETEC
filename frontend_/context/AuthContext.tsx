import React, { createContext, useContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { setAuthHandlers } from '@/services/api';

const isWeb = Platform.OS === 'web';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (accessToken: string, refreshToken: string) => Promise<void>;
  logout: () => Promise<void>;
  accessToken: string | null;
  refreshToken: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  const storeTokens = async (access: string, refresh: string) => {
    if (isWeb) {
      await AsyncStorage.setItem('accessToken', access);
      await AsyncStorage.setItem('refreshToken', refresh);
    } else {
      await SecureStore.setItemAsync('accessToken', access);
      await SecureStore.setItemAsync('refreshToken', refresh);
    }
  };

  const fetchTokens = async () => {
    const access = isWeb
        ? await AsyncStorage.getItem('accessToken')
        : await SecureStore.getItemAsync('accessToken');

    const refresh = isWeb
        ? await AsyncStorage.getItem('refreshToken')
        : await SecureStore.getItemAsync('refreshToken');

    if (access !== accessToken) setAccessToken(access);
    if (refresh !== refreshToken) setRefreshToken(refresh);
    if (!!access !== isAuthenticated) setIsAuthenticated(!!access);

    return { access, refresh };
    };

    const loadTokens = async () => {
    const tokens = await fetchTokens();
    setAccessToken(tokens.access);
    setRefreshToken(tokens.refresh);
    setIsAuthenticated(!!tokens.access);
    };

  const clearTokens = async () => {
    if (isWeb) {
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('refreshToken');
    } else {
      await SecureStore.deleteItemAsync('accessToken');
      await SecureStore.deleteItemAsync('refreshToken');
    }
  };

  const login = async (access: string, refresh: string) => {
    await storeTokens(access, refresh);
    setAccessToken(access);
    setRefreshToken(refresh);
    setIsAuthenticated(true);
    router.replace('/(tabs)/mental');
  };

  const logout = async () => {
    await clearTokens();
    setAccessToken(null);
    setRefreshToken(null);
    setIsAuthenticated(false);
    router.replace('/auth/login');
  };

  useEffect(() => {
  const initializeAuth = async () => {
    await loadTokens();
    setAuthHandlers({ onLogout: logout, getTokens: fetchTokens});
  };
  initializeAuth();
}, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, accessToken, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de <AuthProvider>');
  }
  return context;
};
