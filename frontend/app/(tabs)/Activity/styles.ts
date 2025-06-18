import { colors } from "@/styles/colors";
import { spacing } from "@/styles/spacing";
import { StatusBar, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5', 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#7ab868',
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 15,
  },
  headerText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  avatarPlaceholder: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: '#a0d48f', // Um verde mais claro para o avatar
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  mainContent: {
    flex: 1,
    padding: 20,
  },
  dateNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 15,
    shadowColor: '#000', // Sombra suave
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Elevação para Android
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  stepsCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  stepsCircleContainer: {
    position: 'relative',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#e0f2f7', // Cor de fundo do círculo grande
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  stepsIconBackground: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#61b3ed', // Azul do ícone central
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepsCount: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#333',
  },
  stepsLabel: {
    fontSize: 16,
    color: '#666',
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  metricItem: {
    alignItems: 'center',
  },
  metricCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e0f2f7', // Cor de fundo dos círculos menores
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  metricLabel: {
    fontSize: 12,
    color: '#666',
  },
  hydrationCard: {
    backgroundColor: '#e0f2f7', // Azul claro do cartão de hidratação
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  hydrationTextContent: {},
  hydrationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  hydrationAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  hydrationToday: {
    fontSize: 14,
    color: '#666',
  },
  hydrationIconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#a7d9ef', // Azul mais escuro do círculo de hidratação
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityCard: {
    backgroundColor: '#d4edda', // Verde claro do cartão de atividade
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  activitySubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  checkboxesContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // Alinha os checkboxes à direita
    alignItems: 'center',
    width: '100%',
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10, // Espaçamento entre os checkboxes
  },
  checkboxLabel: {
    fontSize: 12,
    color: '#666',
    marginRight: 5,
  },
  checkbox: {
    width: 25, // Tamanho do checkbox
    height: 25,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: 'white',
    position: 'absolute', // Fixa na parte inferior
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: 'center',
    padding: 5,
  },
  navText: {
    fontSize: 12,
    marginTop: 3,
  },
  addButton: {
    position: 'absolute',
    bottom: 80, // Ajuste conforme a altura da barra de navegação inferior
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#7ab868', // Verde do botão de adicionar
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
});