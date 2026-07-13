import { Pressable, Text, View } from 'react-native';
import type { SearchRestaurantDto } from '../types/map.types';

interface SearchResultItemProps {
  item: SearchRestaurantDto;
  keyword: string;
  onPress: (item: SearchRestaurantDto) => void;
}

function HighlightedName({ name, keyword }: { name: string; keyword: string }) {
  if (!keyword) {
    return (
      <Text className="font-pt-600 text-[14px] text-[#0e0f0c]">{name}</Text>
    );
  }

  const lowerName = name.toLowerCase();
  const lowerKeyword = keyword.toLowerCase();
  const idx = lowerName.indexOf(lowerKeyword);

  if (idx === -1) {
    return (
      <Text className="font-pt-600 text-[14px] text-[#0e0f0c]">{name}</Text>
    );
  }

  return (
    <Text className="font-pt-600 text-[14px]">
      <Text className="text-[#0e0f0c]">{name.slice(0, idx)}</Text>
      <Text className="text-[#50DB42]">
        {name.slice(idx, idx + keyword.length)}
      </Text>
      <Text className="text-[#0e0f0c]">{name.slice(idx + keyword.length)}</Text>
    </Text>
  );
}

export function SearchResultItem({
  item,
  keyword,
  onPress,
}: SearchResultItemProps) {
  return (
    <Pressable
      onPress={() => onPress(item)}
      className="flex-row items-center px-5 h-[68px]"
    >
      <View className="flex-1 justify-center gap-1">
        <HighlightedName name={item.name} keyword={keyword} />
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
    </Pressable>
  );
}
