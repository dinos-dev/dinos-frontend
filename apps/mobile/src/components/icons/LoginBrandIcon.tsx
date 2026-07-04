import Svg, { G, Path, Rect } from 'react-native-svg';

interface LoginBrandIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export function LoginBrandIcon({
  width = 89,
  height = 131,
  color = '#000000',
}: LoginBrandIconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 88.8927 131" fill="none">
      <G>
        <G>
          <Path
            d="M31.1923 1.55955C25.1625 1.55955 20.2756 6.43626 20.2756 12.4762H42.109C42.109 6.43626 37.2221 1.55955 31.1923 1.55955Z"
            fill={color}
          />
          <Path
            d="M54.5857 0C46.8331 0 40.55 5.57339 40.55 12.4762H68.6214C68.6214 5.57339 62.3383 0 54.5857 0Z"
            fill={color}
          />
          <Path
            d="M77.976 1.55955C71.9462 1.55955 67.0593 6.43626 67.0593 12.4762H88.8927C88.8927 6.43626 84.0058 1.55955 77.976 1.55955Z"
            fill={color}
          />
        </G>
        <Rect
          x="21.8324"
          y="15.5953"
          width="18.7143"
          height="37.4286"
          fill={color}
        />
        <Rect
          x="43.6676"
          y="15.5953"
          width="21.8334"
          height="37.4286"
          fill={color}
        />
        <Rect
          x="68.6189"
          y="15.5953"
          width="18.7143"
          height="37.4286"
          fill={color}
        />
        <Path
          d="M56.1436 131H32.75C21.5533 131 12.4766 121.923 12.4766 110.727H56.1436V131ZM87.332 63.9404H87.335V131H56.1445V80.5596L58.7275 77.9766L56.1445 75.3936V63.9404H56.1426V75.3916L54.3164 73.5654L49.9053 77.9766L54.3164 82.3877L56.1426 80.5615V107.607H51.1543L48.3467 102.929L45.5391 107.607H41.7949L38.9873 102.929L36.1797 107.607H19.9629L17.1553 102.929L14.3477 107.607H0V63.9404H21.832V56.1426H87.332V63.9404ZM6.23828 88.8926H12.4766V82.6553H6.23828V88.8926Z"
          fill={color}
        />
      </G>
    </Svg>
  );
}
