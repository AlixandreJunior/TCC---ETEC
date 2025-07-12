import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

interface CompletionIconProps {
  size?: number; // Tamanho do ícone (largura e altura)
  checkmarkColor?: string; // Cor do checkmark
  circleFill?: string; // Cor de preenchimento do círculo
  circleStroke?: string; // Cor da borda do círculo
  circleStrokeWidth?: number; // Largura da borda do círculo
}

const CompletionIcon: React.FC<CompletionIconProps> = ({
  size = 26, // Valor padrão conforme o SVG original
  checkmarkColor = '#8C8D8F', // Cor padrão do checkmark
  circleFill = 'white', // Cor de preenchimento do círculo padrão
  circleStroke = '#E5E7EB', // Cor da borda do círculo padrão
  circleStrokeWidth = 1.5, // Largura da borda do círculo padrão
}) => {
  // O viewBox é 0 0 26 26. Mantemos essa proporção.
  // cx, cy, r para o círculo são 13, 13, 12.25 respectivamente no SVG original (metade do size, e o raio)
  const circleRadius = size / 2 - circleStrokeWidth / 2; // Ajusta raio para strokeWidth
  const center = size / 2;

  return (
    <Svg width={size} height={size} viewBox="0 0 26 26" fill="none">
      <Circle
        cx={center}
        cy={center}
        r={circleRadius}
        fill={circleFill}
        stroke={circleStroke}
        strokeWidth={circleStrokeWidth}
      />
      <Path
        d="M10.4343 18.6971L5.2343 13.4971C4.9219 13.1847 4.9219 12.6781 5.2343 12.3657L6.36565 11.2343C6.67806 10.9219 7.18462 10.9219 7.49703 11.2343L11 14.7372L18.503 7.2343C18.8154 6.9219 19.3219 6.9219 19.6344 7.2343L20.7657 8.36568C21.0781 8.67809 21.0781 9.18462 20.7657 9.49706L11.5657 18.6971C11.2532 19.0095 10.7467 19.0095 10.4343 18.6971Z"
        fill={checkmarkColor} // A cor do checkmark é controlada pela prop
      />
    </Svg>
  );
};

export default CompletionIcon;