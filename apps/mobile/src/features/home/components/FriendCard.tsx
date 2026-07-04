import { View, Text, ImageBackground } from 'react-native';
import type { Friend } from '../types';

interface FriendCardProps {
  friend: Friend;
}

export function FriendCard({ friend }: FriendCardProps) {
  const subLabel = friend.friendCount
    ? `${friend.name}\n외 ${friend.friendCount}명`
    : friend.name;

  return (
    <View className="items-center w-[71px]">
      <View className="h-[71px] w-[71px] rounded-[36px] border-[2.5px] border-dinos-avatar-border p-[4px]">
        <ImageBackground
          source={{ uri: friend.avatarUrl }}
          className="flex-1 rounded-[21px] overflow-hidden items-center justify-center"
          imageStyle={{ borderRadius: 21 }}
        >
          <View className="absolute inset-0 bg-black/40 rounded-[21px]" />
          <Text className="font-pt-800 text-[10px] tracking-[-0.2px] text-white text-center z-10">
            {friend.savedPlaceName}
          </Text>
        </ImageBackground>
      </View>
      <Text className="font-pt-600 text-[10px] tracking-[-0.2px] text-black text-center mt-[7px]">
        {subLabel}
      </Text>
    </View>
  );
}
