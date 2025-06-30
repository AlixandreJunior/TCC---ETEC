import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function MintroLogo(): React.JSX.Element {
  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <Image
          source={require('@/assets/images/logosrobomintro.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: width * 0.05, 
    paddingTop: height * 0.08,
    paddingBottom: height * 0.02,
    minHeight: height * 0.25, 
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: Math.min(width * 0.5, 200), 
    height: Math.min(width * 0.5, 200), 
  },
});