import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

interface PhotoPickerProps {
  selectedImageUri: string | null;
  onImageSelected: (uri: string | null) => void; // Callback quando a imagem é selecionada/removida
}

const PhotoPicker: React.FC<PhotoPickerProps> = ({ selectedImageUri, onImageSelected }) => {
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão Negada', 'Desculpe, precisamos de permissões da galeria para isso funcionar!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Apenas imagens
      allowsEditing: true, // Permite editar/cortar a imagem após a seleção
      aspect: [4, 3], // Proporção para o corte (largura:altura)
      quality: 1, // Qualidade máxima da imagem
    });

    if (!result.canceled) { // Se o usuário selecionou uma imagem e não cancelou
      onImageSelected(result.assets[0].uri); // Envia a URI da imagem para o componente pai
    } else { // Se o usuário cancelou a seleção
      onImageSelected(null); // Opcional: define a imagem como nula se cancelado
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Foto</Text>
      <TouchableOpacity style={styles.photoContainer} onPress={pickImage}>
        {selectedImageUri ? (
          // Exibe a imagem selecionada
          <Image source={{ uri: selectedImageUri }} style={styles.selectedPhoto} />
        ) : (
          // Exibe o placeholder quando nenhuma imagem foi selecionada
          <>
            <MaterialCommunityIcons name="image-outline" size={60} color="#BDC3C7" />
            <Text style={styles.photoChooseText}>Escolher Foto</Text>
            <Text style={styles.photoHintText}>Clique para adicionar uma foto</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  photoContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    overflow: 'hidden',
  },
  selectedPhoto: {
    width: '100%',
    height: 200, // Altura fixa para a imagem selecionada
    resizeMode: 'cover',
    borderRadius: 8,
  },
  photoChooseText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8BC34A',
    marginTop: 10,
  },
  photoHintText: {
    fontSize: 12,
    color: 'gray',
    marginTop: 5,
  },
});

export default PhotoPicker;