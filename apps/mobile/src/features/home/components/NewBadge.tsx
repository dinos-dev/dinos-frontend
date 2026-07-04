import { Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export function NewBadge() {
  return (
    <LinearGradient
      colors={['rgb(178,230,0)', 'rgb(80,219,66)']}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={{
        borderRadius: 13,
        paddingHorizontal: 10,
        paddingVertical: 3,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text className="font-pt-600 text-[12.5px] tracking-[-0.25px] text-dinos-badge-text">
        new
      </Text>
    </LinearGradient>
  );
}
