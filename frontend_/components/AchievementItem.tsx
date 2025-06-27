// components/AchievementItem.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface AchievementItemProps {
  iconName: string;
  iconColor?: string;
  iconBackgroundColor?: string; 
  title: string;
  description: string;
}

export default function AchievementItem({
  iconName,
  iconColor = 'white', 
  iconBackgroundColor = '#8BC34A', 
  title,
  description,
}: AchievementItemProps) {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <View style={[styles.iconBackground, { backgroundColor: iconBackgroundColor }]}>
          <MaterialCommunityIcons name={'account-cash-outline'} size={28} color={iconColor} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%', 
    marginHorizontal: '1%', 
    padding: 15,
    marginBottom: 15,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBackground: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#7F8C8D',
  },
});