import Svg, { Path } from "react-native-svg";

export const SleepIcon = ({ size = 20, color = "#000" }) => (
  <Svg width={size} height={size} viewBox="0 0 640 512" fill="none">
    <Path
      d="M32 32c17.7 0 32 14.3 32 32v256h224V160c0-17.7 14.3-32 32-32h224c53 0 96 43 96 96v224c0 17.7-14.3 32-32 32s-32-14.3-32-32v-32H288h-32L64 416v32c0 17.7-14.3 32-32 32S0 465.7 0 448V64c0-17.7 14.3-32 32-32zm144 96a80 80 0 1 1 0 160 80 80 0 1 1 0-160z"
      fill={color}
    />
  </Svg>
);
