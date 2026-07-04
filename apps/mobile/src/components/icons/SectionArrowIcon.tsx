import Svg, { Circle, Path } from 'react-native-svg';

interface SectionArrowIconProps {
  size?: number;
}

export function SectionArrowIcon({ size = 37 }: SectionArrowIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 37 37" fill="none">
      <Circle cx={18.5} cy={18.5} r={18.5} fill="#F6F6F6" />
      <Path
        d="M19 12.5L25.5 19L19 25"
        stroke="black"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <Path d="M10.5 19H24.5" stroke="black" strokeWidth={1.5} />
    </Svg>
  );
}
