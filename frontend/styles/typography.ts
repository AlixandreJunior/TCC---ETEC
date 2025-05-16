import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const typography = StyleSheet.create({
  h1: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: colors.text.primary,
  },
  h2: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: colors.text.primary,
  },
  h3: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: colors.text.primary,
  },
  h4: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: colors.text.primary,
  },
  subtitle1: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: colors.text.secondary,
  },
  subtitle2: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.text.secondary,
  },
  body1: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: colors.text.primary,
  },
  body2: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: colors.text.secondary,
  },
  caption: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: colors.text.light,
  },
  button: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: colors.text.white,
  },
  buttonSmall: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: colors.text.white,
  },
  inputLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.text.secondary,
  },
  inputText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: colors.text.primary,
  },
  link: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: colors.primary,
  },
  linkSmall: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.primary,
  },
});