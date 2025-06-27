import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface VerticalDotsIconProps {
  size?: number; // Tamanho do ícone (largura e altura)
  color?: string; // Cor de preenchimento do ícone
  opacity?: number; // Opacidade do preenchimento (valor entre 0 e 1)
}

const VerticalDotsIcon: React.FC<VerticalDotsIconProps> = ({
  size = 18, 
  color = 'black', 
  opacity = 0.8, 
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 6 21" fill="none">
      <Path
        d="M3 7.45161C1.34167 7.45161 0 8.81492 0 10.5C0 12.1851 1.34167 13.5484 3 13.5484C4.65833 13.5484 6 12.1851 6 10.5C6 8.81492 4.65833 7.45161 6 7.45161ZM6 3.04839C6 4.73347 4.65833 6.09677 3 6.09677C1.34167 6.09677 0 4.73347 0 3.04839C0 1.36331 1.34167 0 3 0C4.65833 0 6 1.36331 6 3.04839ZM6 17.9516C6 19.6367 4.65833 21 3 21C1.34167 21 0 19.6367 0 17.9516C0 16.2665 1.34167 14.9032 3 14.9032C4.65833 14.9032 6 16.2665 6 17.9516Z"
        fill={color} 
        fillOpacity={opacity} 
      />
    </Svg>
  );
};

export default VerticalDotsIcon;