import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface MeditationIconProps {
  size?: number; // Tamanho do ícone (largura e altura)
  color?: string; // Cor de preenchimento do ícone
}

const MeditationIcon: React.FC<MeditationIconProps> = ({
  size = 24, // Valor padrão de 24
  color = '#525252', // Cor padrão, conforme o SVG original
}) => {
  // O viewBox é 0 0 15 11. Para manter a proporção ao redimensionar, calculamos a altura proporcional.
  const aspectRatio = 15 / 11; // width / height
  const svgWidth = size;
  const svgHeight = size / aspectRatio;

  return (
    <Svg width={svgWidth} height={svgHeight} viewBox="0 0 15 11" fill="none">
      <Path
        d="M7.67188 0C8.53521 0 9.22743 0.611875 9.22743 1.375C9.22743 2.13812 8.53521 2.75 7.67188 2.75C6.80854 2.75 6.11632 2.13812 6.11632 1.375C6.11632 0.611875 6.81632 0 7.67188 0ZM14.6719 8.25V6.875C12.9297 6.875 11.4363 6.215 10.3163 5.0325L9.2741 3.9325C9.12939 3.77745 8.94764 3.65265 8.74188 3.56706C8.53613 3.48148 8.31149 3.43723 8.0841 3.4375H7.28299C6.80854 3.4375 6.37299 3.61625 6.07743 3.9325L5.03521 5.0325C3.90743 6.215 2.4141 6.875 0.671875 6.875V8.25C2.82632 8.25 4.70854 7.44562 6.11632 6.01562V7.5625L3.09854 8.62812C2.57743 8.81375 2.22743 9.28125 2.22743 9.76937C2.22743 10.45 2.84965 11 3.61965 11H5.33854V10.6562C5.33854 10.2004 5.54340 9.76324 5.90806 9.44091C6.27271 9.11858 6.76729 8.93750 7.28299 8.9375H9.61632C9.83410 8.9375 10.0052 9.08875 10.0052 9.28125C10.0052 9.47375 9.83410 9.625 9.61632 9.625H7.28299C6.63743 9.625 6.11632 10.0856 6.11632 10.6562V11H11.7241C12.4941 11 13.1163 10.45 13.1163 9.76937C13.1163 9.28125 12.7663 8.81375 12.2452 8.62812L9.22743 7.5625V6.01562C10.6352 7.44562 12.5174 8.25 14.6719 8.25Z"
        fill={color} // A cor do preenchimento é controlada pela prop 'color'
      />
    </Svg>
  );
};

export default MeditationIcon;