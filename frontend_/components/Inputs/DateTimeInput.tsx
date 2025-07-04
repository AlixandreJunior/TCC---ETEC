import React from "react";
import { GestureResponderEvent, StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { Text, View } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'

interface DateTimeInputProps{
    labelText: string
    onPress: ((event: GestureResponderEvent) => void)
    datetime: Date,
    showPicker:boolean
    onChange: (event: DateTimePickerEvent, date?: Date) => void
    mode: 'time' | 'date'
}

export const DateTimeInput: React.FC<DateTimeInputProps> = ({
    labelText,
    onPress,
    datetime,
    showPicker,
    onChange, mode
}) => {
    return(
    <View style={styles.inputSection}>
        <Text style={styles.inputLabel}>{labelText}</Text>
        <TouchableOpacity onPress={ onPress } style={[styles.textInputStyle, styles.pickerButton]}>
            <Text style={styles.pickerButtonText}>
                { mode === 'time' 
                ? datetime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
                : datetime.toLocaleDateString('pt-BR')
                }
            </Text>
        </TouchableOpacity>
        
        {showPicker && (
        <DateTimePicker value={datetime} mode={mode} display="default" onChange={onChange} maximumDate={new Date()}/>
        )}
    </View>
    )
}

const styles = StyleSheet.create(
    {
    inputSection: { marginBottom: 20 },
  inputLabel: { 
    fontSize: 14, 
    fontFamily: 'Poppins_400Regular', // Poppins SemiBold para labels
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
  } as ViewStyle, // Casting para ViewStyle para compatibilidade

  textInputStyle: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1, // Para ter a borda como outlined
    borderColor: '#E5E7EB', // Cor da borda
    minHeight: 56, // Altura padrão para TextInput do Paper
    justifyContent: 'center', // Centraliza o conteúdo verticalmente
    paddingHorizontal: 12, // Padding horizontal consistente
    fontFamily: 'Poppins_400Regular', // Fonte para o texto dentro do picker
  },
  pickerButton: {
    flexDirection: 'row', // Para alinhar texto e possível ícone
    alignItems: 'center', // Alinha verticalmente
    justifyContent: 'space-between', 
  },
  pickerButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#333', // Cor do texto
  },
    }
)