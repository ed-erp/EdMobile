import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
const CheckBoxCrossIcon = (props: any) => (
  <Svg
    fill={props.color}
    width={props.width}
    height={props.height}
    viewBox="0 0 24 24"
    id="cross-circle"
    data-name="Flat Color"
    xmlns="http://www.w3.org/2000/svg"
    className="icon flat-color"
    {...props}
  >
    <Circle id="primary" cx={12} cy={12} r={10} fill={props.color} />
    <Path
      id="secondary"
      d="M13.41,12l2.3-2.29a1,1,0,0,0-1.42-1.42L12,10.59,9.71,8.29A1,1,0,0,0,8.29,9.71L10.59,12l-2.3,2.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l2.29,2.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"
      fill="#FFFFFF"
    />
  </Svg>
);
export default CheckBoxCrossIcon;
