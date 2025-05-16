import React, { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface InfoItemProps {
  icon: ReactNode;
  text: string;
}

export default function InfoItem({ icon, text }: InfoItemProps) {
  return (
    <View style={styles.container}>
      {icon}
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#334155',
  },
});