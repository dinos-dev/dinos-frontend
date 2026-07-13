import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SearchIcon } from '@/components/icons';

interface MapSearchBarProps {
  onPress: () => void;
}

export function MapSearchBar({ onPress }: MapSearchBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="absolute left-0 right-0 items-center"
      style={{ top: insets.top + 12 }}
      pointerEvents="box-none"
    >
      <Pressable
        onPress={onPress}
        className="flex-row items-center bg-white border border-[#eaefe9] rounded-full h-[43px] w-[328px] px-4"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.08,
          shadowRadius: 4,
          elevation: 2,
        }}
      >
        <SearchIcon size={20} color="#0E0F0C" />
        <Text className="ml-2 font-pt-600 text-[16px] text-[#f1f1ed]">
          검색
        </Text>
      </Pressable>
    </View>
  );
}
