import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface NotebookIconProps {
  size?: number; // Tamanho do ícone (largura e altura)
  color?: string; // Cor de preenchimento do ícone
}

const NotebookIcon: React.FC<NotebookIconProps> = ({
  size = 20, // Valor padrão para largura e altura
  color = '#525252', // Cor padrão, conforme o SVG original
}) => {
  // O viewBox deve ser mantido como o original do SVG para escalabilidade.
  // As props 'width' e 'height' controlarão o tamanho final na tela.
  // A proporção original é 13x15.
  const aspectRatio = 13 / 15; // width / height
  return (
    <Svg width={size} height={size} viewBox="0 0 13 15" fill="none">
      <Path
        d="M3.15625 0.75C1.70703 0.75 0.53125 1.92578 0.53125 3.375V12.125C0.53125 13.5742 1.70703 14.75 3.15625 14.75H11.0312H11.9062C12.3902 14.75 12.7812 14.359 12.7812 13.875C12.7812 13.391 12.3902 13 11.9062 13V11.25C12.3902 11.25 12.7812 10.859 12.7812 10.375V1.625C12.7812 1.14102 12.3902 0.75 11.9062 0.75H11.0312H3.15625ZM3.15625 11.25H10.1562V13H3.15625C2.67227 13 2.28125 12.609 2.28125 12.125C2.28125 11.641 2.67227 11.25 3.15625 11.25ZM4.03125 4.6875C4.03125 4.44688 4.22813 4.25 4.46875 4.25H9.71875C9.95938 4.25 10.1562 4.44688 10.1562 4.6875C10.1562 4.92812 9.95938 5.125 9.71875 5.125H4.46875C4.22813 5.125 4.03125 4.92812 4.03125 4.6875ZM4.46875 6H9.71875C9.95938 6 10.1562 6.19688 10.1562 6.4375C10.1562 6.67812 9.95938 6.875 9.71875 6.875H4.46875C4.22813 6.875 4.03125 6.67812 4.03125 6.4375C4.03125 6.19688 4.22813 6 4.46875 6Z"
        fill={color} // A cor do preenchimento é controlada pela prop 'color'
      />
    </Svg>
  );
};

export default NotebookIcon;