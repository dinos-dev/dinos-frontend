import Svg, { Path } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
}

export function BellIcon({ size = 16, color = '#083400' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16.12 16.12" fill="none">
      <Path
        d="M8.06 0C4.88 0 2.303 2.506 2.303 5.598V8.598c0 .229-.093.449-.257.608L.715 10.732a1.558 1.558 0 00-.477 1.128c0 .87.705 1.574 1.574 1.574h12.973c.87 0 1.574-.705 1.574-1.574 0-.425-.172-.832-.477-1.128l-1.569-1.526a.86.86 0 01-.257-.608V5.598C14.818 2.506 12.24 0 8.06 0z"
        stroke={color}
        strokeWidth={1.273}
      />
      <Path
        d="M10.747 13.434c0 1.484-1.203 2.687-2.687 2.687s-2.687-1.203-2.687-2.687"
        stroke={color}
        strokeWidth={1.273}
      />
    </Svg>
  );
}
