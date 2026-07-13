import Svg, { Circle, Line } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
}

export function CurrentLocationIcon({ size = 24, color = 'black' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={5.25} stroke={color} strokeWidth={1.4} />
      <Line
        x1={12}
        y1={5.75}
        x2={12}
        y2={8.75}
        stroke={color}
        strokeWidth={1.4}
        strokeLinecap="round"
      />
      <Line
        x1={12}
        y1={15.25}
        x2={12}
        y2={18.25}
        stroke={color}
        strokeWidth={1.4}
        strokeLinecap="round"
      />
      <Line
        x1={18.25}
        y1={12}
        x2={15.25}
        y2={12}
        stroke={color}
        strokeWidth={1.4}
        strokeLinecap="round"
      />
      <Line
        x1={8.75}
        y1={12}
        x2={5.75}
        y2={12}
        stroke={color}
        strokeWidth={1.4}
        strokeLinecap="round"
      />
    </Svg>
  );
}
