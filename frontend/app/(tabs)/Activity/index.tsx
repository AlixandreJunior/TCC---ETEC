import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, StatusBar, StyleSheet } from 'react-native';
import { AntDesign, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { styles } from './styles';

const HomeScreen = () => {
  // Dados simulados para os checkboxes
  const exerciseDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']; 
  const mindfulnessDays = ['S', 'S', 'S', 'S', 'S']; 

  return (
    <ScrollView>
    <SafeAreaView>
      <StatusBar barStyle="light-content" backgroundColor="#7ab868" />
      <View style={styles.header}>
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>A</Text>
        </View>
        <Text style={styles.headerText}>Mintró</Text>
        <TouchableOpacity>
          <AntDesign name="setting" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        <View style={styles.dateNavigation}>
          <TouchableOpacity>
            <AntDesign name="left" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.dateText}>Hoje</Text>
          <TouchableOpacity>
            <AntDesign name="right" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <View style={styles.stepsCard}>
          <View style={styles.stepsCircleContainer}>
            <View style={styles.stepsIconBackground}>
              <MaterialCommunityIcons name="shoe-print" size={50} color="white" />
            </View>
          </View>
          <Text style={styles.stepsCount}>6.565</Text>
          <Text style={styles.stepsLabel}>passos</Text>
          <View style={styles.metricsContainer}>
            <View style={styles.metricItem}>
              <View style={styles.metricCircle}>
                <MaterialCommunityIcons name="map-marker-outline" size={24} color="#61b3ed" />
              </View>
              <Text style={styles.metricValue}>5,31</Text>
              <Text style={styles.metricLabel}>km</Text>
            </View>
            <View style={styles.metricItem}>
              <View style={styles.metricCircle}>
                <MaterialCommunityIcons name="fire" size={24} color="#f08080" />
              </View>
              <Text style={styles.metricValue}>2.203</Text>
              <Text style={styles.metricLabel}>kcal</Text>
            </View>
          </View>
        </View>

        <View style={styles.hydrationCard}>
          <View style={styles.hydrationTextContent}>
            <Text style={styles.hydrationTitle}>Hidratação</Text>
            <Text style={styles.hydrationAmount}>750 ml</Text>
            <Text style={styles.hydrationToday}>Hoje</Text>
          </View>
          <View style={styles.hydrationIconCircle}>
            <MaterialCommunityIcons name="water" size={40} color="white" />
          </View>
        </View>

        <View style={styles.activityCard}>
          <Text style={styles.activityTitle}>Dias com Exercício</Text>
          <Text style={styles.activitySubtitle}>1 de 5</Text>
          <View style={styles.checkboxesContainer}>
            <View style={styles.checkboxItem}>
              <MaterialCommunityIcons name="check-circle" size={24} color="#7ab868" />
            </View>
            {exerciseDays.map((day, index) => (
              <View style={styles.checkboxItem} key={index}>
                <Text style={styles.checkboxLabel}>{day}</Text>
                <View
                  style={[
                    styles.checkbox,
                    {
                      backgroundColor: index === 0 ? '#7ab868' : '#e0e0e0',
                      borderColor: index === 0 ? '#7ab868' : '#ccc',
                    },
                  ]}
                >
                  {index === 0 && <AntDesign name="check" size={18} color="white" />}
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.activityCard, { backgroundColor: '#d4edda' }]}>
          <Text style={styles.activityTitle}>Dias com Mindfulness</Text>
          <Text style={styles.activitySubtitle}>1 de 5</Text>
          <View style={styles.checkboxesContainer}>
            <View style={styles.checkboxItem}>
              <MaterialCommunityIcons name="check-circle" size={24} color="#7ab868" />
            </View>
            {mindfulnessDays.map((day, index) => (
              <View style={styles.checkboxItem} key={index}>
                <Text style={styles.checkboxLabel}>{day}</Text>
                <View
                  style={[
                    styles.checkbox,
                    {
                      backgroundColor: index === 0 ? '#7ab868' : '#e0e0e0',
                      borderColor: index === 0 ? '#7ab868' : '#ccc',
                    },
                  ]}
                >
                  {index === 0 && <AntDesign name="check" size={18} color="white" />}
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.addButton}>
        <AntDesign name="plus" size={30} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
    </ScrollView>
  );
};

export default HomeScreen;