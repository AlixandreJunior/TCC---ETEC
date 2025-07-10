import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import Header from '@/components/Layout/Header';
import { Goal } from '@/types/user/goal';
import { getGoals } from '@/services/goals/getGoals';
import { User } from '@/types/user/user';
import { getUser } from '@/services/user/getUser';
import { UserInfoSection } from '@/components/UserInfoSection';
import { StatsSection } from '@/components/StatsSection';

const screenContentPaddingHorizontal = 20;

export default function ProfileScreen() {
  const [fetchedUser, setFetchedUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [errorUser, setErrorUser] = useState<string | null>(null);

  const [userGoals, setUserGoals] = useState<Goal | null>(null);
  const [loadingGoals, setLoadingGoals] = useState(true);
  const [errorGoals, setErrorGoals] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoadingUser(true);
      setErrorUser(null);
      try {
        const data = await getUser();
        setFetchedUser(data);
      } catch (err: any) {
        setErrorUser(err.message || 'Falha ao carregar dados do usuário.');
        console.error('Erro ao buscar usuário:', err);
      } finally {
        setLoadingUser(false);
      }
    };

    const fetchUserGoals = async () => {
      setLoadingGoals(true);
      setErrorGoals(null);
      try {
        const data = await getGoals();
        setUserGoals(data);
      } catch (err: any) {
        setErrorGoals(err.message || 'Falha ao carregar metas.');
        console.error('Erro ao buscar metas:', err);
      } finally {
        setLoadingGoals(false);
      }
    };

    fetchUserData();
    fetchUserGoals();
  }, []);

  const displayName = fetchedUser?.username || 'Carregando...';
  const joinYear = fetchedUser?.created_at ? new Date(fetchedUser.created_at).getFullYear() : 'N/A';
  const avatarChar = fetchedUser?.username ? fetchedUser.username.charAt(0).toUpperCase() : 'A';

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header avatarChar={avatarChar} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <UserInfoSection
          avatarChar={avatarChar}
          displayName={displayName}
          joinYear={joinYear}
        />
        <StatsSection
          fetchedUser={fetchedUser}
          userGoals={userGoals}
          loadingGoals={loadingGoals}
          loadingUser={loadingUser}
          errorGoals={errorGoals}
          errorUser={errorUser}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    marginTop: 10,
    paddingBottom: 20,
    paddingHorizontal: screenContentPaddingHorizontal,
    backgroundColor: '#fff',
  },
});