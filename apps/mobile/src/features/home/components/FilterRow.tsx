import { View, Text, Pressable } from 'react-native';
import { ChevronDownIcon } from '@/components/icons';

interface FilterRowProps {
  categoryLabel: string;
  radiusLabel: string;
  onCategoryPress: () => void;
  onRadiusPress: () => void;
}

export function FilterRow({
  categoryLabel,
  radiusLabel,
  onCategoryPress,
  onRadiusPress,
}: FilterRowProps) {
  return (
    <View className="flex-row items-center gap-[9px] px-[22px] py-[8px]">
      <View className="bg-dinos-filter-bg rounded-[15px] h-[30px] px-[11px] items-center justify-center">
        <Text className="font-pt-600 text-[14px] tracking-[-0.28px] text-[#0f0c0c]">
          필터
        </Text>
      </View>
      <Pressable
        onPress={onCategoryPress}
        className="flex-row items-center gap-[7px] border border-dinos-border rounded-[15px] h-[30px] px-[11px]"
      >
        <Text className="font-pt-600 text-[14px] tracking-[-0.28px] text-dinos-border">
          {categoryLabel}
        </Text>
        <ChevronDownIcon size={10} color="#061e36" />
      </Pressable>
      <Pressable
        onPress={onRadiusPress}
        className="flex-row items-center gap-[7px] bg-white border border-dinos-border rounded-[15px] h-[30px] px-[11px]"
      >
        <Text className="font-pt-600 text-[14px] tracking-[-0.28px] text-dinos-border">
          {radiusLabel}
        </Text>
        <ChevronDownIcon size={10} color="#061e36" />
      </Pressable>
    </View>
  );
}
