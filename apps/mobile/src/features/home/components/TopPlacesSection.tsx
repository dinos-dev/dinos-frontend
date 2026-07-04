import { View, Text, Pressable } from 'react-native';
import { SectionArrowIcon } from '@/components/icons';
import { PlaceCard } from './PlaceCard';
import type { Place } from '../types';

interface TopPlacesSectionProps {
  places: Place[];
  username: string;
}

export function TopPlacesSection({ places, username }: TopPlacesSectionProps) {
  const visiblePlaces = places.slice(0, 3);

  return (
    <View className="px-[16px] mt-[8px]">
      <View className="flex-row items-center justify-between mb-[8px]">
        <Text className="font-pt-700 text-[18px] tracking-[-0.36px] text-black">
          {username}님을 위한 TOP 10
        </Text>
        <Pressable hitSlop={8}>
          <SectionArrowIcon size={37} />
        </Pressable>
      </View>
      <View className="bg-dinos-section-bg rounded-[20px] py-[10px]">
        {visiblePlaces.map((place) => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </View>
    </View>
  );
}
