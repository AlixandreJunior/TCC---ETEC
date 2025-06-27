import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const GameIcon = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 512"
    width={24}
    height={24}
    fill="currentColor"
    {...props}
  >
    <Path d="M480.1 96H160a160 160 0 1 0 114.2 272h91.5A160 160 0 1 0 480.1 96zM248 268a12 12 0 0 1-12 12h-52v52a12 12 0 0 1-12 12h-24a12 12 0 0 1-12-12v-52H84a12 12 0 0 1-12-12v-24a12 12 0 0 1 12-12h52v-52a12 12 0 0 1 12-12h24a12 12 0 0 1 12 12v52h52a12 12 0 0 1 12 12zm216 76a40 40 0 1 1 40-40 40 40 0 0 1-40 40zm64-96a40 40 0 1 1 40-40 40 40 0 0 1-40 40z" />
  </Svg>
);

export default GameIcon;
