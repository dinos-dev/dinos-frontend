import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TAB_BAR_HEIGHT = 48;

export function PinReviewToggle() {
  const insets = useSafeAreaInsets();
  const bottomOffset = Math.max(insets.bottom, 16) + TAB_BAR_HEIGHT + 16;

  return (
    <View
      className="absolute left-0 right-0 items-center"
      style={{ bottom: bottomOffset }}
      pointerEvents="box-none"
    >
      <View
        className="flex-row items-center bg-white rounded-full"
        style={{
          width: 154,
          height: 48,
          borderWidth: 0.587,
          borderColor: '#d5d2d2',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.08,
          shadowRadius: 4,
          elevation: 2,
          padding: 4,
        }}
      >
        <View className="w-[73px] h-[40px] bg-[#083400] rounded-full items-center justify-center">
          <Text className="font-pt-600 text-[16px] text-white">핀</Text>
        </View>
        <Pressable className="flex-1 h-[40px] items-center justify-center">
          <Text className="font-pt-600 text-[16px] text-[#222]">리뷰</Text>
        </Pressable>
      </View>
    </View>
  );
}
