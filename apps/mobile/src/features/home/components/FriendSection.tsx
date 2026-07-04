import { View, Text, ScrollView, Pressable } from 'react-native';
import { SectionArrowIcon } from '@/components/icons';
import { FriendCard } from './FriendCard';
import type { Friend } from '../types';

interface FriendSectionProps {
  friends: Friend[];
}

export function FriendSection({ friends }: FriendSectionProps) {
  return (
    <View className="mt-[20px]">
      <View className="flex-row items-center justify-between px-[13px] mb-[10px]">
        <Text className="font-pt-700 text-[18px] tracking-[-0.36px] text-black">
          나와 같은 곳 저장한 친구
        </Text>
        <Pressable hitSlop={8}>
          <SectionArrowIcon size={37} />
        </Pressable>
      </View>
      <View className="bg-dinos-section-bg rounded-[20px] mx-[15px] py-[12px]">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="px-[15px] gap-[8px]"
        >
          {friends.map((friend) => (
            <FriendCard key={friend.id} friend={friend} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
