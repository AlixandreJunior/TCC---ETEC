import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

interface PhotoPickerProps {
  selectedImageUri: string | null;
  onImageSelected: (uri: string | null) => void;
}

const PhotoPicker: React.FC<PhotoPickerProps> = ({ selectedImageUri, onImageSelected }) => {
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão Negada', 'Desculpe, precisamos de permissões da galeria para isso funcionar!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'], // CORRETO
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true 
    });

    if (!result.canceled && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      console.log('URI correta:', uri);
      onImageSelected(uri);
    } else {
      onImageSelected(null);
    }
  }; 

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Foto</Text>
      <TouchableOpacity style={styles.photoContainer} onPress={pickImage}>
        {selectedImageUri ? (
          <Image source={{ uri: selectedImageUri }} style={styles.selectedPhoto} />
        ) : (
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
    height: 200,
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
