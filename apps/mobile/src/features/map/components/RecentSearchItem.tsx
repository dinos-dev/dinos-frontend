import { Pressable, Text, View } from 'react-native';
import { SearchClearIcon } from '@/components/icons';
import type { RecentSearchRecord } from '../types/map.types';

interface RecentSearchItemProps {
  item: RecentSearchRecord;
  onPress: (item: RecentSearchRecord) => void;
  onRemove: (id: string) => void;
}

export function RecentSearchItem({
  item,
  onPress,
  onRemove,
}: RecentSearchItemProps) {
  return (
    <Pressable
      onPress={() => onPress(item)}
      className="flex-row items-center px-5 h-[68px]"
    >
      <View className="flex-1 justify-center gap-1">
        <Text
          className="font-pt-600 text-[14px] text-[#0e0f0c]"
          numberOfLines={1}
        >
          {item.name}
        </Text>
        <Text
          className="font-pt-400 text-[10px] text-[#444745]"
          numberOfLines={1}
        >
          {item.address}
        </Text>
      </View>
      <View className="items-end justify-center gap-1 ml-3 min-w-[64px]">
        {item.category && (
          <Text className="font-pt-400 text-[10px] text-[#0e0f0c]">
            {item.category}
          </Text>
        )}
        <Text className="font-pt-400 text-[10px] text-[#444745]">
          {item.distanceKm.toFixed(1)}km
        </Text>
      </View>
      <Pressable
        onPress={(event) => {
          event.stopPropagation();
          onRemove(item.id);
        }}
        className="w-8 h-8 ml-1 items-center justify-center"
        hitSlop={8}
      >
        <SearchClearIcon size={18} />
      </Pressable>
    </Pressable>
  );
}
