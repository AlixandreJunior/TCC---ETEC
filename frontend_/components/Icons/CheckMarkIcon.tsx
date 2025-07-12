import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface CheckmarkIconProps {
  size?: number; // Tamanho para largura e altura
  color?: string; // Cor de preenchimento do checkmark
}

const CheckmarkIcon: React.FC<CheckmarkIconProps> = ({ size = 18, color = '#FFFBFB' }) => {
  const svgWidth = size;
  const svgHeight = (size * 18) / 22; 

  return (
    <Svg width={svgWidth} height={svgHeight} viewBox="0 0 22 18" fill="none">
      <Path
        d="M7.69325 18L0 9.46778L1.92331 7.33472L7.69325 13.7339L20.0767 0L22 2.13306L7.69325 18Z"
        fill={color}
      />
    </Svg>
  );
};

export default CheckmarkIcon;