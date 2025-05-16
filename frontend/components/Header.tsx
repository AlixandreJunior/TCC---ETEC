import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Heart, BellDot, Bell } from 'lucide-react-native';
import { colors } from "@/styles/colors"
import { spacing } from '@/styles/spacing';


interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Heart size={24} color={colors.blue.main} />
          </View>
          <Text style={styles.headerTitle}>{title}</Text>
          <TouchableOpacity>
            <Bell size={24} color={colors.text.secondary} />
          </TouchableOpacity>
        </View>
  );
}

const styles = StyleSheet.create({
  header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: spacing.lg,
      backgroundColor: colors.background.main,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      marginBottom: spacing.md,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    logoContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.sm,
    },
    headerTitle: {
      fontFamily: "Poppins-SemiBold",
      fontSize: 20,
      color: colors.text.primary,
    }
  }
)