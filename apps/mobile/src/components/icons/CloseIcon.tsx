import Svg, { Circle, Line } from 'react-native-svg';

interface IconProps {
  size?: number;
}

export function CloseIcon({ size = 24 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={12} fill="#ECEFEE" />
      <Line
        x1={16.2}
        y1={7.9}
        x2={7.9}
        y2={16.2}
        stroke="#083400"
        strokeWidth={1.6}
      />
      <Line
        x1={16}
        y1={16.2}
        x2={7.9}
        y2={7.9}
        stroke="#083400"
        strokeWidth={1.6}
      />
    </Svg>
  );
}
