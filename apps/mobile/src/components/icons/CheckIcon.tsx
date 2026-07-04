import Svg, { Path } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
}

export function CheckIcon({ size = 18, color = '#0F0C0C' }: IconProps) {
  return (
    <Svg width={size} height={size * (12 / 18)} viewBox="0 0 18 12" fill="none">
      <Path
        d="M0.531 4.53L7.031 11.03L17.531 0.53"
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </Svg>
  );
}
