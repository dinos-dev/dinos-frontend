import Svg, { Path } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
}

export function ChevronDownIcon({ size = 10, color = '#061E36' }: IconProps) {
  return (
    <Svg width={size} height={size * 0.6} viewBox="0 0 10 6" fill="none">
      <Path
        d="M0.408 0.408L5.408 5.408L10.024 0.408"
        stroke={color}
        strokeWidth={1.154}
        strokeLinejoin="round"
      />
    </Svg>
  );
}
