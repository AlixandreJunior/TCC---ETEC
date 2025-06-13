import AsyncStorage from '@react-native-async-storage/async-storage';

const SecureStore = AsyncStorage

export const saveToken = async (access: string, refresh: string) => {
  await SecureStore.setItem('access', access);
  await SecureStore.setItem('refresh', refresh);
};

export const getAccessToken = () => {
  return SecureStore.getItem('access');
};

export const getRefreshToken = () => {
  return SecureStore.getItem('refresh');
};

export const clearToken = async () => {
  await SecureStore.removeItem('access');
  await SecureStore.removeItem('refresh');
  return ('RANNNNNN')
};