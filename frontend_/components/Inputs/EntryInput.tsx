import { Eye, EyeOff } from "lucide-react-native"
import React from "react"
import { Dimensions, GestureResponderEvent, KeyboardTypeOptions, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"

interface EntryInputProps{
    labelText: string
    value: string
    placeholder?: string
    icon?: React.ReactNode
    keyboardType: KeyboardTypeOptions
    onChange: ((text: string) => void)
    secureText?: {
        showSecureText: boolean
        setShowSecureText: ((event: GestureResponderEvent) => void)
    }
    
}

const { width, height } = Dimensions.get('window');


export const EntryInput: React.FC<EntryInputProps> = ({
    labelText,
    placeholder,
    icon,
    keyboardType,
    value,
    onChange,
    secureText,
}) => {
    return(
        <View style={styles.inputGroup}>
            <Text style={styles.label}>{labelText}</Text>
            <View style={styles.inputContainer}>
            {icon}
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor="#C7C7CD"
                value={value}
                onChangeText={onChange}
                keyboardType={keyboardType}
                autoCapitalize="none"
                secureTextEntry={secureText ? !secureText.showSecureText : false}
            />
            {
                secureText && (
                <TouchableOpacity
                  onPress={secureText?.setShowSecureText}
                  style={styles.eyeIcon}
                >
                  {secureText?.showSecureText ? (
                    <EyeOff size={20} color="#9CA3AF" />
                  ) : (
                    <Eye size={20} color="#9CA3AF" />
                  )}
                </TouchableOpacity>
                )
            }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    
  inputGroup: {
    marginBottom: height * 0.025,
  },
  label: {
    fontSize: width * 0.04,
    color: '#6B7280',
    marginBottom: 8,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: height * 0.02,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minHeight: height * 0.065,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: width * 0.04,
    color: '#374151',
    fontWeight: '400',
  },
  eyeIcon: {
    padding: 4,
  },
})