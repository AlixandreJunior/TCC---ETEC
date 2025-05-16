import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '../styles/colors';
import { spacing } from '../styles/spacing';
import { Chrome as Home, User, Activity, Search } from 'lucide-react-native';

interface TabBarProps {
  activeTab: string;
}

export const TabBar: React.FC<TabBarProps> = ({ activeTab }) => {
  const router = useRouter();

  const tabs = [
    { 
      key: 'home', 
      label: 'Home', 
      icon: (active: boolean) => <Home size={24} color={active ? colors.primary : colors.darkGray} />,
      route: '/(tabs)' 
    },
    { 
      key: 'search', 
      label: 'Buscar', 
      icon: (active: boolean) => <Search size={24} color={active ? colors.primary : colors.darkGray} />,
      route: '/(tabs)/search' 
    },
    { 
      key: 'activity', 
      label: 'Atividades', 
      icon: (active: boolean) => <Activity size={24} color={active ? colors.primary : colors.darkGray} />,
      route: '/(tabs)/activity' 
    },
    { 
      key: 'profile', 
      label: 'Perfil', 
      icon: (active: boolean) => <User size={24} color={active ? colors.primary : colors.darkGray} />,
      route: '/(tabs)/profile' 
    },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tab}
            onPress={() => router.navigate(tab.route)}
            activeOpacity={0.7}
          >
            {tab.icon(isActive)}
            <Text style={[
              styles.tabLabel,
              isActive && styles.activeTabLabel
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.gray,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: colors.darkGray,
    marginTop: spacing.xs,
  },
  activeTabLabel: {
    color: colors.primary,
  },
});