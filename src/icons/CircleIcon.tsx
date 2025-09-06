import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const CircleIcon = (props: any) => (
  <Svg
    width={props.width}
    height={props.height}
    viewBox="0 0 24 24"
    id="meteor-icon-kit__solid-circle"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
      fill={props.color}
    />
  </Svg>
);

export default CircleIcon;
