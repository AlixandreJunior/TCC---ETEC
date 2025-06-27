// components/AuthFooterLink.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface AuthFooterLinkProps {
  staticText: string;
  linkText: string;
  onPressLink: () => void;
}

export default function AuthFooterLink({ staticText, linkText, onPressLink }: AuthFooterLinkProps): React.JSX.Element {
  return (
    <View style={styles.textContainer}>
      <Text style={styles.staticText}>{staticText} </Text>
      <TouchableOpacity onPress={onPressLink}>
        <Text style={styles.linkText}>{linkText}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  staticText: {
    fontSize: 14,
    color: '#2C3E50',
  },
  linkText: {
    fontSize: 14,
    color: '#8BC34A',
    fontWeight: 'bold',
  },
});