import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { TouchableOpacity, GestureResponderEvent } from 'react-native';

type BackArrowProps = {
  size?: number;
  color?: string;
  onPress?: (event: GestureResponderEvent) => void;
};

const BackArrow = ({ size = 24, color = '#000', onPress }: BackArrowProps) => {
  return (
    <TouchableOpacity onPress={onPress} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M15 18L9 12L15 6"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </TouchableOpacity>
  );
};

export default BackArrow;
