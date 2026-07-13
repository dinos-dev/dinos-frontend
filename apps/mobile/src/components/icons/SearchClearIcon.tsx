import Svg, { Circle, Line } from 'react-native-svg';

interface IconProps {
  size?: number;
}

export function SearchClearIcon({ size = 24 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={12} fill="#0E0F0C" />
      <Line x1={16} y1={8} x2={8} y2={16} stroke="white" strokeWidth={1.5} />
      <Line x1={16} y1={16} x2={8} y2={8} stroke="white" strokeWidth={1.5} />
    </Svg>
  );
}
