import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { ActivityIndicator, GestureResponderEvent, StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { Text, View } from "react-native";
import { Menu } from "react-native-paper";

interface SelectInputProps{
  labelText: string
  itemList: any[]
  itemId: number | null
  setItemId: ((id: number) => void)
}

export const SelectInput: React.FC<SelectInputProps> = ({
    labelText,
    itemList,
    setItemId,
    itemId
}) => {
    const [menuVisible, setMenuVisible] = useState(false)
    const [loadingItem, setLoadingItem] = useState(false);
    
    const selectedItemName = itemList.find((item) => item.id === itemId)?.name || 'Selecione';

    return(
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>{labelText}</Text>
          {loadingItem ? (
            <ActivityIndicator animating size="small" color="#0000ff" />
          ) : (
            <Menu
              visible={menuVisible}
              onDismiss={() => setMenuVisible(false)}
              anchor={
                <TouchableOpacity
                  onPress={() => setMenuVisible(true)}
                  style={[styles.textInputStyle, styles.pickerButton]} // Aplicando estilo de input
                >
                  <Text style={styles.pickerButtonText}>
                    {selectedItemName}
                  </Text>
                  <MaterialCommunityIcons name="chevron-down" size={24} color="#666" />
                </TouchableOpacity>
              }
            >
              {itemList.map((item) => (
                <Menu.Item
                  key={item.id}
                  onPress={() => {
                    setItemId(item.id);
                    setMenuVisible(false);
                  }}
                  title={item.name}
                  titleStyle={styles.menuItemText} 
                />
              ))}
            </Menu>
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
   menuItemText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: '#333',
  }
}
)