// utils/moodHelpers.ts
import { MoodType } from '@/types/mental/diary';
import { ImageSourcePropType } from 'react-native'; // Importe para tipar a source da imagem

interface MoodVisuals {
  iconSource: ImageSourcePropType; // source da imagem local
  color: string;
}

export function getMoodVisuals(mood: MoodType): MoodVisuals {
  switch (mood) {
    case "Excelente":
      return { iconSource: require('@/assets/images/mood-excellent.png'), color: "#22C55E" }; // Exemplo de cor
    case "Bom":
      return { iconSource: require('@/assets/images/mood-smile.png'), color: "#8BC34A" };
    case "Neutro":
      return { iconSource: require('@/assets/images/mood-neutral.png'), color: "#6B7280" };
    case "Ruim":
      return { iconSource: require('@/assets/images/mood-sad.png'), color: "#FFC107" };
    case "Péssimo":
      return { iconSource: require('@/assets/images/mood-very-sad.png'), color: "#F44336" };
    default:
      return { iconSource: require('@/assets/images/mood-neutral.png'), color: "#9E9E9E" };
  }
}