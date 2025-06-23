// utils/activityIconMapper.ts
import { MaterialCommunityIcons } from '@expo/vector-icons';

type IconName = keyof typeof MaterialCommunityIcons.glyphMap;

export function getActivityIconName(activityName: string): IconName {
  const lowerCaseName = activityName.toLowerCase();

  switch (lowerCaseName) {
    case "família":
      return "home-heart";
    case "amigos":
      return "account-group";
    case "encontro":
      return "account-multiple";
    case "atividade física":
      return "dumbbell";
    case "esporte":
      return "soccer";
    case "dormir cedo":
      return "power-sleep";
    case "alimentação saudável":
      return "food-apple";
    case "descanso":
      return "sleep";
    case "filmes":
      return "movie-open-outline";
    case "ler":
      return "book-open-outline";
    case "jogos":
      return "gamepad-variant-outline";
    case "compras":
      return "shopping-outline";
    case "trabalho":
      return "briefcase-outline";
    default:
      return "help-circle-outline"; 
  }
}