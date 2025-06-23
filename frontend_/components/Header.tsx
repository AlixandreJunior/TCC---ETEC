import { router } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import NotificationIcon from './Icons/ChatIcon';

interface HeaderProps {
  avatarChar: string;
}

const { width, height } = Dimensions.get('window');

const Header: React.FC<HeaderProps> = ({
  avatarChar,
}) => {

  const logoSource = require('@/assets/images/logosrobomintro.png')
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.avatarContainer} onPress={() => router.push('/(tabs)/profile')}>
        <Text style={styles.avatarText}>{avatarChar}</Text>
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <Image source={logoSource} style={styles.logoImage} resizeMode="contain" />
      </View>

      <TouchableOpacity>
        <NotificationIcon/>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.02,
    paddingVertical: height * 0.01,
    backgroundColor: '#86D293',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 10,
    minHeight: height * 0.04,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: Math.min(width * 0.5, 90),
    height: Math.min(width * 0.15, 40),
    resizeMode: 'contain',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#79D457',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default Header;