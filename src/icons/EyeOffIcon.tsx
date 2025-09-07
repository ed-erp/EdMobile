import React from 'react';
import Svg, { Path } from 'react-native-svg';

type Props = {
  size?: number;
  color?: string;
};

const EyeOffIcon = ({ size = 24, color = '#6B7280' }: Props) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 3l18 18M9.88 9.88a3 3 0 104.24 4.24"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10.73 5.08A10.07 10.07 0 0112 5c4 0 8.5 3 10.5 8a19.14 19.14 0 01-1.67 3.27m-3.08 2.86C15.81 20.23 14 21 12 21c-4 0-8.5-3-10.5-8a18.65 18.65 0 012.27-3.86"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default EyeOffIcon;
