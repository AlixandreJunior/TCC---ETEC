import React from "react";
import { KeyboardType, StyleSheet, Text, View, ViewStyle } from "react-native";
import { TextInput } from "react-native-paper";

interface MainInputProps{
    labelText: string
    value: any
    keyboardType: KeyboardType
    onChangeText: (text: string) => void
    placeholder?: string
}

export const MainInput: React.FC<MainInputProps> = ({
    labelText,
    value,
    keyboardType,
    onChangeText,
    placeholder
}) => {
    return(
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>{labelText}</Text>
          <TextInput
            mode="outlined"
            value={value}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
            style={styles.textInput}
            placeholder={placeholder ? placeholder : 'Opcional'}
            outlineStyle={styles.textInputOutline as ViewStyle}
            theme={{ fonts: { regular: { fontFamily: 'Poppins_400Regular' } } }}
          />
        </View>
    )
}

const styles = StyleSheet.create(
    {
        inputSection: { 
            marginBottom: 20 
        },
        inputLabel: {
            fontSize: 14,
            fontFamily: 'Poppins_400Regular',
            color: '#4B5563',
            marginBottom: 2
        },
        textInput: {
            backgroundColor: 'white',
            borderRadius: 8,
        },
        textInputOutline: {
            borderRadius: 8,
            borderColor: '#E5E7EB',
        } as ViewStyle,
        
        textInputStyle: {
            backgroundColor: 'white',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#E5E7EB',
            minHeight: 56,
            justifyContent: 'center',
            paddingHorizontal: 12,
        },
    }
)