import MindfulnessScreen from "@/screens/SubPages/MindfulnessScreen";
import { Provider as PaperProvider } from 'react-native-paper';

export default function App() {
  return(
  <PaperProvider>
    <MindfulnessScreen />;
  </PaperProvider>)
}