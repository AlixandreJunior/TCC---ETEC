import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors } from '../styles/colors';
import { spacing } from '../styles/spacing';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'filled' | 'outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  width?: number | string;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'filled',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  width,
}) => {
  
  const getButtonStyle = () => {
    switch (variant) {
      case 'outlined':
        return [
          styles.button,
          styles.buttonOutlined,
          disabled && styles.buttonDisabledOutlined,
          getButtonSizeStyle(),
        ];
      case 'text':
        return [
          styles.button,
          styles.buttonText,
          disabled && styles.buttonDisabledText,
          getButtonSizeStyle(),
        ];
      case 'filled':
      default:
        return [
          styles.button,
          styles.buttonFilled,
          disabled && styles.buttonDisabled,
          getButtonSizeStyle(),
        ];
    }
  };

  const getButtonSizeStyle = () => {
    switch (size) {
      case 'small':
        return styles.buttonSmall;
      case 'large':
        return styles.buttonLarge;
      case 'medium':
      default:
        return styles.buttonMedium;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'outlined':
        return [
          styles.text,
          styles.textOutlined,
          disabled && styles.textDisabledOutlined,
          getTextSizeStyle(),
        ];
      case 'text':
        return [
          styles.text,
          styles.textText,
          disabled && styles.textDisabledText,
          getTextSizeStyle(),
        ];
      case 'filled':
      default:
        return [
          styles.text,
          styles.textFilled,
          disabled && styles.textDisabled,
          getTextSizeStyle(),
        ];
    }
  };

  const getTextSizeStyle = () => {
    switch (size) {
      case 'small':
        return styles.textSmall;
      case 'large':
        return styles.textLarge;
      case 'medium':
      default:
        return styles.textMedium;
    }
  };

  return (
    <TouchableOpacity
      style={[
        getButtonStyle(),
        width && { width },
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator size="small" color={variant === 'filled' ? colors.white : colors.primary} />
      ) : (
        <Text style={[getTextStyle(), textStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonFilled: {
    backgroundColor: colors.primary,
  },
  buttonOutlined: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  buttonText: {
    backgroundColor: 'transparent',
  },
  buttonDisabled: {
    backgroundColor: colors.darkGray,
  },
  buttonDisabledOutlined: {
    borderColor: colors.darkGray,
  },
  buttonDisabledText: {
    opacity: 0.5,
  },
  buttonSmall: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    minHeight: 36,
  },
  buttonMedium: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    minHeight: 48,
  },
  buttonLarge: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    minHeight: 56,
  },
  text: {
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
  textFilled: {
    color: colors.white,
  },
  textOutlined: {
    color: colors.primary,
  },
  textText: {
    color: colors.primary,
  },
  textDisabled: {
    color: colors.white,
  },
  textDisabledOutlined: {
    color: colors.darkGray,
  },
  textDisabledText: {
    color: colors.darkGray,
  },
  textSmall: {
    fontSize: 14,
  },
  textMedium: {
    fontSize: 16,
  },
  textLarge: {
    fontSize: 18,
  },
});