import * as React from 'react';
import Svg, { Defs, G, Path } from 'react-native-svg';

const LogoIcon = (props: any) => (
  <Svg
    height={props.height}
    width={props.width}
    fill={props.color}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    stroke="#ffffff"
  >
    <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
    <G
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></G>
    <G id="SVGRepo_iconCarrier">
      <Path d="M4.802 22.667v-12.531l-2.802-1.604v15.734l13.599 7.734v-3.198zM15.599 25.599v-9.198l-8-4.667v9.333zM16 3.198l10.802 6.271 2.797-1.604-13.599-7.865-13.599 7.865 2.797 1.604zM24 11.068l-8-4.667-8 4.667 8 4.667zM16.401 25.734l8-4.667v-3.203l-5.469 3.203v-3.203l8.266-4.797v9.599l-10.797 6.135v3.198l13.599-7.734v-15.734l-13.599 7.87z"></Path>{' '}
    </G>
  </Svg>
);
export default LogoIcon;
