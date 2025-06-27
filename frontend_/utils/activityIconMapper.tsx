import React from 'react'; // NECESSÁRIO para JSX
import { FamilyIcon } from '@/components/Icons/FamilyIcon';
import { FriendIcon } from '@/components/Icons/FriendIcon';
import { LoveIcon } from '@/components/Icons/LoveIcon';
import { SportIcon } from '@/components/Icons/SportIcon';
import { SleepIcon } from '@/components/Icons/SleepIcon';
import { AppleIcon } from '@/components/Icons/AppleIcon';
import { MovieIcon } from '@/components/Icons/MovieIcon';
import NotebookIcon from '@/components/Icons/NotebookIcon';
import { CartIcon } from '@/components/Icons/CartIcon';
import JobIcon from '@/components/Icons/JobIcon';
import SmileIcon from '@/components/Icons/SmileIcon';
import { DumbbellIcon } from '@/components/Icons/DumbellIcon';
import GameIcon from '@/components/Icons/GameIcon';
import MoonIcon from '@/components/Icons/MoonIcon';


export function getActivityIconName(activityName: string, iconSize?: number): React.ReactNode { // Tipo de retorno é React.ReactNode
  const lowerCaseName = activityName?.toLowerCase() || "";
  const size = iconSize; // Tamanho padrão para os ícones, ajuste conforme necessário
  const iconColor = "#000"; // Cor padrão para os ícones, ajuste conforme necessário

  switch (lowerCaseName) {
    case "família":
      return <FamilyIcon size={size} color={iconColor} />;
    case "amigos":
      return <FriendIcon size={size} color={iconColor} />;
    case "encontro":
      return <LoveIcon size={size} color={iconColor} />;
    case "atividade física":
      return <DumbbellIcon size={size} color={iconColor} />;
    case "esporte":
      return <SportIcon size={size} color={iconColor} />;
    case "dormir cedo":
      return <MoonIcon size={size} color={iconColor} />;
    case "alimentação saudável":
      return <AppleIcon size={size} color={iconColor} />;
    case "descanso": // Se descanso tiver um ícone diferente de dormir cedo
      return <SleepIcon size={size} color={iconColor} />; // Ou um novo icon para Descanso
    case "filmes":
      return <MovieIcon size={size} color={iconColor} />;
    case "ler":
      return <NotebookIcon size={size} color={iconColor} />;
    case "jogos":
      return <GameIcon size={size} color={iconColor} />;
    case "compras":
      return <CartIcon size={size} color={iconColor} />;
    case "trabalho":
      return <JobIcon size={size} color={iconColor} />;
    default:
      return <SmileIcon size={size} color={iconColor} />; // Ícone padrão
  }
}