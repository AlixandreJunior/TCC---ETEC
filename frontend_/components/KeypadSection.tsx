import React from "react";
import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BackspaceIcon from "./Icons/Backspace";

interface KeypadSectionProps{
    handleKeyPress: (key: string) => void
}

const { width, height } = Dimensions.get('window');

const KeypadSection: React.FC<KeypadSectionProps> = ({
handleKeyPress,
}) => {
    return(
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.keypadContainer}>
                <View style={styles.keypad}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
                    <TouchableOpacity
                        key={number}
                        style={styles.keypadButton}
                        onPress={() => handleKeyPress(String(number))}
                    >
                        <Text style={styles.keypadButtonText}>{number}</Text>
                    </TouchableOpacity>
                    ))}
        
                    <View style={styles.keypadButtonPlaceholder} />
                    <TouchableOpacity
                    style={styles.keypadButton}
                    onPress={() => handleKeyPress('0')}
                    >
                    <Text style={styles.keypadButtonText}>0</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.keypadButton}
                    onPress={() => handleKeyPress('backspace')}
                    >
                    <BackspaceIcon/>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        justifyContent: 'center', // ou 'flex-end' se quiser o teclado no final da tela
    },
    keypadContainer: {
    width: '100%',
    alignItems: 'center',
  },
  keypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '90%',
    maxWidth: 400,
  },
  keypadButton: {
    width: '33.33%',
    height: height * 0.09,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keypadButtonPlaceholder: {
    width: '33.33%',
    height: height * 0.09,
  },
  keypadButtonText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: width * 0.07,
    color: '#4a4a4a',
  },
})

export default KeypadSection