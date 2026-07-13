import { Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CurrentLocationIcon } from '@/components/icons';

interface CurrentLocationButtonProps {
  onPress: () => void;
}

const TAB_BAR_HEIGHT = 48;
const CONTROL_BOTTOM_GAP = 16;

export function CurrentLocationButton({ onPress }: CurrentLocationButtonProps) {
  const insets = useSafeAreaInsets();
  const bottomOffset =
    Math.max(insets.bottom, 16) + TAB_BAR_HEIGHT + CONTROL_BOTTOM_GAP;

  return (
    <Pressable
      onPress={onPress}
      className="absolute right-6 bg-white w-[48px] h-[48px] rounded-full items-center justify-center"
      style={[styles.shadow, { bottom: bottomOffset }]}
    >
      <CurrentLocationIcon size={28} color="black" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
});
