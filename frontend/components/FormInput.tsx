import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../styles/colors';
import { spacing } from '../styles/spacing';
import { User, Mail, Calendar } from 'lucide-react-native';

interface FormInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  label?: string;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'url';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
  maxLength?: number;
  multiline?: boolean;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  iconType?: 'user' | 'mail' | 'calendar' | 'custom';
  customIcon?: React.ReactNode;
  onIconPress?: () => void;
}

export const FormInput: React.FC<FormInputProps> = ({
  value,
  onChangeText,
  placeholder,
  label,
  error,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  autoCorrect = false,
  maxLength,
  multiline = false,
  style,
  inputStyle,
  iconType,
  customIcon,
  onIconPress,
}) => {
  const renderIcon = () => {
    if (!iconType && !customIcon) return null;

    const iconContent = customIcon ? (
      customIcon
    ) : (
      <>
        {iconType === 'user' && <User size={20} color={colors.darkGray} />}
        {iconType === 'mail' && <Mail size={20} color={colors.darkGray} />}
        {iconType === 'calendar' && <Calendar size={20} color={colors.darkGray} />}
      </>
    );

    if (onIconPress) {
      return (
        <TouchableOpacity style={styles.iconContainer} onPress={onIconPress}>
          {iconContent}
        </TouchableOpacity>
      );
    }

    return <View style={styles.iconContainer}>{iconContent}</View>;
  };

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <View style={[
        styles.inputContainer,
        error ? styles.inputContainerError : null,
      ]}>
        {renderIcon()}
        
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.darkGray}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          maxLength={maxLength}
          multiline={multiline}
          style={[
            styles.input,
            multiline && styles.multilineInput,
            iconType || customIcon ? styles.inputWithIcon : null,
            inputStyle,
          ]}
        />
      </View>
      
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    backgroundColor: colors.white,
  },
  inputContainerError: {
    borderColor: colors.error,
  },
  input: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: colors.text.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    minHeight: 48,
  },
  inputWithIcon: {
    paddingLeft: 8,
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  iconContainer: {
    paddingLeft: spacing.md,
  },
  errorText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: colors.error,
    marginTop: spacing.xs,
  },
});