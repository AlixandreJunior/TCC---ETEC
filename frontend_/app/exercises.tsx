import ActivityScreen from "@/screens/SubPages/ExercisesScreen";
import { Provider as PaperProvider } from 'react-native-paper';

export default function App() {
  return(
  <PaperProvider>
    <ActivityScreen />;
  </PaperProvider>)
}