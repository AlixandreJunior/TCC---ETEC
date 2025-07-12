import React from "react";
import { Dimensions, GestureResponderEvent, StyleSheet, TouchableOpacity } from "react-native"
import { Text, TextInput, View } from "react-native"

const { width, height } = Dimensions.get('window');

interface EntryFormCardProps {
    welcomeText: string
    subtitleText: string
    error: string | null
    children: React.ReactNode
    handleSubmit: (event: GestureResponderEvent) => void
    textSubmit: string
    backText: string
    handleBack: (event: GestureResponderEvent) => void
    backLink: string
}

export const EntryFormCard: React.FC<EntryFormCardProps> = ({welcomeText, subtitleText, error, children, handleSubmit, textSubmit, backText, handleBack, backLink}) => {
    return(
        <View style={styles.formCard}>
            <Text style={styles.welcomeText}>{welcomeText}</Text>
            <Text style={styles.subtitleText}>{subtitleText}</Text>

            {error ? (
                <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
                </View>
            ) : null}

            {children}

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitText}>{textSubmit}</Text>
            </TouchableOpacity>


            <View style={styles.backContainer}>
                <Text style={styles.backText}>{backText} </Text>
                <TouchableOpacity onPress={handleBack}>
                <Text style={styles.backLink}>{backLink}</Text>
                </TouchableOpacity>
            </View>
            </View>
    )
}


const styles = StyleSheet.create({
    
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: width * 0.08, // 8% da largura da tela
    paddingVertical: height * 0.05, // 5% da altura da tela
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 12,
    width: '100%',
    maxWidth: width * 0.9, // 90% da largura máxima
    minWidth: width * 0.85, // 85% da largura mínima
  },
  welcomeText: {
    fontSize: width * 0.065, // 6.5% da largura da tela
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: width * 0.04, // 4% da largura da tela
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: height * 0.04, // 4% da altura da tela
  },
  errorContainer: {
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    padding: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  errorText: {
    color: '#DC2626',
    fontSize: width * 0.035, // 3.5% da largura da tela
    fontWeight: '500',
    textAlign: 'center',
  },
  
  submitButton: {
    backgroundColor: '#79D457',
    borderRadius: 16,
    paddingVertical: height * 0.022,
    alignItems: 'center',
    marginTop: height * 0.02,
    marginBottom: height * 0.02,
    shadowColor: '#79D457',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    minHeight: height * 0.06,
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: width * 0.045,
    fontWeight: '600',
  },
 testButton: {
    borderRadius: 16,
    alignItems: "center",
    marginBottom: height * 0.02,
    marginTop: height * 0.02,
  },
  testButtonText: {
    color: "#79D457",
    fontSize: width * 0.04,
    fontWeight: "600",
  },
  backContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  backText: {
    fontSize: width * 0.04,
    color: '#6B7280',
    fontWeight: '400',
  },
  backLink: {
    fontSize: width * 0.04,
    color: '#79D457',
    fontWeight: '600',
  },
})