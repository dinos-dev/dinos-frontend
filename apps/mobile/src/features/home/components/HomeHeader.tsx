import { View, Pressable } from 'react-native';
import { BellIcon, DinosLogo } from '@/components/icons';

export function HomeHeader() {
  return (
    <View className="flex-row items-center justify-between px-[24px] h-[50px]">
      <DinosLogo width={81} height={21} />
      <Pressable
        hitSlop={8}
        className="relative bg-dinos-section-bg rounded-[20px] w-[28px] h-[28px] items-center justify-center"
      >
        <BellIcon size={16} color="#083400" />
        <View className="absolute top-0 right-0 w-[12px] h-[12px] rounded-full bg-dinos-green border-[0.85px] border-white" />
      </Pressable>
    </View>
  );
}
