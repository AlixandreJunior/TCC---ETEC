import React, { useState } from 'react';
import { View, Text, ScrollView, Image, Switch, TouchableOpacity } from 'react-native';
import { Brain, Heart, Dumbbell, MailIcon, Calendar, User as UserIcon, Clock, BellIcon } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '@/components/Header';
import StatCard from '@/components/StatCard';
import InfoItem from '@/components/InfoItem';
import { styles } from './styles';

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  
  return (
    <View style={styles.container}>
      <Header title="Perfil" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.profileContainer}>
          <View style={styles.avatarContainer}>
            <LinearGradient
              colors={['#FFA500', '#FF4500']}
              style={styles.avatarGradient}
            >
              <Image
                source={{ uri: 'https://images.pexels.com/photos/6146931/pexels-photo-6146931.jpeg' }}
                style={styles.avatarImage}
              />
            </LinearGradient>
          </View>
          
          <Text style={styles.name}>Alixandre de Oliveira</Text>
        </View>
        
        <View style={styles.statsContainer}>
          <StatCard 
            icon={<Brain size={28} color="#000000" />}
            value="42" 
            label="Check-ins Mentais" 
          />
          <StatCard 
            icon={<Heart size={28} color="#000000" />}
            value="30" 
            label="Check-ins Físicos" 
          />
        </View>
        
        <View style={styles.statsContainer}>
          <StatCard 
            icon={<Dumbbell size={28} color="#000000" />}
            value="25" 
            label="Exercícios" 
          />
          <StatCard 
            icon={<View style={styles.lotusIcon}><Text>⛫</Text></View>}
            value="18" 
            label="Mindfulness" 
          />
        </View>
        
        <View style={styles.infoContainer}>
          <InfoItem 
            icon={<MailIcon size={20} color="#64748B" />}
            text="joao.silva@email.com" 
          />
          <InfoItem 
            icon={<Calendar size={20} color="#64748B" />}
            text="15/03/1990" 
          />
          <InfoItem 
            icon={<UserIcon size={20} color="#64748B" />}
            text="Masculino" 
          />
          <InfoItem 
            icon={<Clock size={20} color="#64748B" />}
            text="Conta criada em 01/04/2025" 
          />
        </View>
        
        <View style={styles.notificationContainer}>
          <View style={styles.notificationRow}>
            <BellIcon size={20} color="#000000" />
            <Text style={styles.notificationText}>Receber notificações</Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#D1D5DB', true: '#A855F7' }}
            thumbColor="#FFFFFF"
          />
        </View>
        
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Editar Perfil</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Sair da Conta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
