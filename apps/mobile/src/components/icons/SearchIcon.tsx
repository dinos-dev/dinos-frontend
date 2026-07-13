import Svg, { Circle, Line } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
}

export function SearchIcon({ size = 20, color = '#0E0F0C' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Circle
        cx={9.8995}
        cy={9.8995}
        r={6.25}
        stroke={color}
        strokeWidth={1.5}
      />
      <Line
        x1={14.4961}
        y1={14.4961}
        x2={18.0316}
        y2={18.0316}
        stroke={color}
        strokeWidth={1.5}
      />
    </Svg>
  );
}
