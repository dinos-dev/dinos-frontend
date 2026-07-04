import Svg, { Path } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
}

export function HomeIcon({ size = 17, color = '#2E2F34' }: IconProps) {
  return (
    <Svg width={size} height={size * (18 / 17)} viewBox="0 0 17 18" fill="none">
      <Path
        d="M0 6.24V17.76H7.2V10.56H9.12V17.76H16.32V6.24L8.16 0L0 6.24Z"
        fill={color}
      />
    </Svg>
  );
}
