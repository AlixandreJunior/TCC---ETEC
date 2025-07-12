import type React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
// MaterialCommunityIcons pode ser removido se todos os ícones forem SVGs customizados
// import { MaterialCommunityIcons } from "@expo/vector-icons" 

// Importar as fontes Poppins (devem estar carregadas no RootLayout)
import { 
  Poppins_400Regular, 
  Poppins_500Medium, // Adicione se usar este peso para labels
  Poppins_600SemiBold
} from '@expo-google-fonts/poppins'

interface ObjectiveGridItemProps {
  label: string
  renderIcon: React.ReactNode // Espera o componente SVG do ícone (React.ReactNode)
  isSelected: boolean
  onPress: () => void
}

const ObjectiveGridItem: React.FC<ObjectiveGridItemProps> = ({ label, renderIcon, isSelected, onPress }) => {
  return (
    <View style={styles.wrapper}>
        <TouchableOpacity
            style={[
            styles.objectiveGridItem,
            isSelected ? styles.objectiveGridItemSelected : null
            ]}
            onPress={onPress}
        >
            <View style={styles.iconWrapper}>
            {renderIcon}
            </View>
        </TouchableOpacity>

        <Text
            numberOfLines={3}
            ellipsizeMode="tail"
            style={[
                styles.objectiveLabel,
                isSelected ? styles.objectiveLabelSelected : null
            ]}
            >
            {label}
            </Text>
        </View>
    
  )
}

const styles = StyleSheet.create({
    wrapper: {
        width: 58, // Ligeiramente maior que o botão (50) para dar espaço ao texto
        alignItems: 'center',
        }, 
  objectiveGridItem: {
    width: 50, // Ligeiramente menor para permitir 5 colunas em telas menores com padding
    height: 50, // Altura ajustada para ser um pouco maior que a largura
    backgroundColor: "white",
    borderRadius: 8, // Arredondamento dos cantos
    justifyContent: "center", // Centraliza verticalmente
    alignItems: "center", // Centraliza horizontalmente
    marginHorizontal: 4, // Espaçamento entre os itens na linha
    borderWidth: 1, // Borda sutil
    borderColor: '#AEAEAE', // Cor da borda
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0.5 }, // Sombra bem sutil, quase nenhuma vertical
    shadowOpacity: 0.05, // Quase invisível
    shadowRadius: 1, // Um leve desfoque
    elevation: 1, // Elevação mínima para Android
  },
  objectiveGridItemSelected: {
    backgroundColor: "#E0FFD0", // Fundo verde claro da imagem quando selecionado
    borderColor: "#A3D900", // Borda verde mais escura quando selecionado
  },
  iconWrapper: { // Wrapper para dar um tamanho consistente aos ícones customizados (SVGs)
    width: 16, // Tamanho da área do ícone
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4, // Espaço entre ícone e label
  },
  objectiveLabel: {
        fontSize: 10,
        fontFamily: "Poppins_400Regular",
        color: "#000",
        marginTop: 4,
        textAlign: "center",
        lineHeight: 14,
        maxWidth: 65,
        minHeight: 30, // garante espaço para até 2 linhas
        },

  objectiveLabelSelected: {
    color: "#333", // Texto em preto/cinza escuro quando selecionado, conforme imagem
    fontFamily: "Poppins_600SemiBold", // Negrito quando selecionado
  },
})

export default ObjectiveGridItem