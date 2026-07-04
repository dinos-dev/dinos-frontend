import Svg, { Path } from 'react-native-svg';

interface PlaceholderIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export function PlaceholderIcon({
  width = 34,
  height = 37,
  color = '#D9D9D9',
}: PlaceholderIconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 34 37" fill="none">
      <Path
        d="M34 19.496C34 21.729 33.56 23.939 32.706 26.002C31.852 28.064 30.599 29.938 29.021 31.517C27.442 33.096 25.568 34.348 23.506 35.202C21.443 36.056 19.233 36.496 17 36.496C14.768 36.496 12.557 36.056 10.494 35.202C8.432 34.348 6.558 33.096 4.979 31.517C3.401 29.938 2.148 28.064 1.294 26.002C0.44 23.939 0 21.729 0 19.496L17 19.496H34Z"
        fill={color}
      />
      <Path
        d="M9 3.996L5 10.996H11L7.5 17.496"
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <Path
        d="M26.5 3.996L22.5 10.996H28.5L25 17.496"
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <Path
        d="M17.5 0.496L13.5 7.496H19.5L16 13.996"
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
      />
    </Svg>
  );
}
