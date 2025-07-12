import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface PinSectionProps{
    pin: string
}
const { width, height } = Dimensions.get('window');

const PinSection: React.FC<PinSectionProps> = ({
    pin
}) => {
    return(
        <SafeAreaView style={styles.pinSection}>
            <Text style={styles.pinPrompt}>Inserir PIN</Text>
            <View style={styles.pinCirclesContainer}>
                {[...Array(4)].map((_, index) => (
                <View
                    key={index}
                    style={[
                    styles.pinCircle,
                    pin.length > index && styles.pinCircleFilled,
                    ]}
                />
                ))}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    
  pinSection: {
    alignItems: 'center',
    marginBottom: height * 0.05,
  },
  pinPrompt: {
    fontSize: width * 0.05,
    color: '#6a6a6a',
    marginBottom: height * 0.02,
  },
  pinCirclesContainer: {
    flexDirection: 'row',
  },
  pinCircle: {
    width: width * 0.055,
    height: width * 0.055,
    borderRadius: (width * 0.055) / 2,
    borderWidth: 2,
    borderColor: '#ccc',
    marginHorizontal: width * 0.025,
  },
  pinCircleFilled: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
})

export default PinSection