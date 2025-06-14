import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const isWeb = Platform.OS === 'web';

export const saveToken = async (accessToken: string, refreshToken: string) => {
  if (isWeb) {
    await AsyncStorage.setItem('accessToken', accessToken);
    await AsyncStorage.setItem('refreshToken', refreshToken);
  } else {
    await SecureStore.setItemAsync('accessToken', accessToken);
    await SecureStore.setItemAsync('refreshToken', refreshToken);
  }

  const token = await getToken()
  console.log(token)
};

export const getToken = async () => {
  const accessToken = isWeb
    ? await AsyncStorage.getItem('accessToken')
    : await SecureStore.getItemAsync('accessToken');
  return accessToken;
};

export const getRefreshToken = async () => {
  const refreshToken = isWeb
    ? await AsyncStorage.getItem('refreshToken')
    : await SecureStore.getItemAsync('refreshToken');
  return refreshToken;
};

export const clearTokens = async () => {
  if (isWeb) {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
  } else {
    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('refreshToken');
  }
};
