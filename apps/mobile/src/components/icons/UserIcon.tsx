import Svg, { Path, Rect } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
}

export function UserIcon({ size = 16, color = '#2E2F34' }: IconProps) {
  const scale = size / 16;
  const height = 21 * scale;
  return (
    <Svg width={size} height={height} viewBox="0 0 16 21" fill="none">
      <Path
        d="M2.4331 0.348C1.0892 0.348 0 1.435 0 2.781H4.8662C4.8662 1.435 3.777 0.348 2.4331 0.348Z"
        fill={color}
      />
      <Path
        d="M7.6478 0C5.9199 0 4.5195 1.242 4.5195 2.781H10.7761C10.7761 1.242 9.3757 0 7.6478 0Z"
        fill={color}
      />
      <Path
        d="M12.8608 0.348C11.5169 0.348 10.4277 1.435 10.4277 2.781H15.2939C15.2939 1.435 14.2048 0.348 12.8608 0.348Z"
        fill={color}
      />
      <Rect y={16.32} width={15.36} height={3.84} fill={color} />
      <Rect y={4.8} width={8.64} height={10.56} fill={color} />
      <Rect y={3.84} width={15.36} height={0.96} fill={color} />
      <Rect x={8.64} y={4.8} width={6.72} height={10.56} fill={color} />
      <Path
        d="M1.3924 13.903L2.4351 15.641H0.3496L1.3924 13.903Z"
        fill="white"
      />
      <Path
        d="M13.9041 13.903L14.9468 15.641H12.8613L13.9041 13.903Z"
        fill="white"
      />
      <Rect x={10.775} y={9.385} width={1.39} height={1.39} fill="white" />
      <Rect x={3.477} y={9.385} width={1.39} height={1.39} fill="white" />
      <Rect
        x={2.434}
        y={7.359}
        width={1.39}
        height={1.39}
        transform="rotate(45 2.434 7.359)"
        fill="white"
      />
      <Rect
        x={13.148}
        y={7.359}
        width={1.39}
        height={1.39}
        transform="rotate(45 13.148 7.359)"
        fill="white"
      />
    </Svg>
  );
}
