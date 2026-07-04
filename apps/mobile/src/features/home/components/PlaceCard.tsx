import { View, Text, Image } from 'react-native';
import { PlaceholderIcon } from '@/components/icons';
import { NewBadge } from './NewBadge';
import type { Place } from '../types';

interface PlaceCardProps {
  place: Place;
}

export function PlaceCard({ place }: PlaceCardProps) {
  return (
    <View className="flex-row items-center px-[15px] py-[8px]">
      {place.imageUrl ? (
        <Image
          source={{ uri: place.imageUrl }}
          className="h-[79px] w-[80px] rounded-[15px] bg-white border border-[#ececec]"
        />
      ) : (
        <View className="h-[79px] w-[80px] rounded-[15px] bg-white border border-[#ececec] items-center justify-center">
          <PlaceholderIcon width={34} height={37} />
        </View>
      )}
      <View className="ml-[18px] flex-1">
        <View className="flex-row items-center gap-[6px]">
          <Text className="font-pt-600 text-[16px] tracking-[-0.32px] text-black">
            {place.name}
          </Text>
          {place.isNew && <NewBadge />}
        </View>
        <Text className="font-pt-400 text-[10px] tracking-[-0.2px] text-dinos-sub mt-[2px]">
          {place.address}
        </Text>
        <View className="flex-row items-center mt-[6px] gap-[6px]">
          <Image
            source={{ uri: place.savedBy.avatarUrl }}
            className="h-[20px] w-[20px] rounded-[10px]"
          />
          <Text className="font-pt-400 text-[10px] tracking-[-0.2px] text-dinos-sub">
            {place.savedBy.name}
          </Text>
        </View>
      </View>
    </View>
  );
}
