import { View } from 'react-native';

interface TabBarIconProps {
  icon: React.ReactNode;
  focused: boolean;
}

export function TabBarIcon({ icon, focused }: TabBarIconProps) {
  return (
    <View
      className={`items-center justify-center rounded-full ${
        focused ? 'bg-[#2E2F34] h-[48px] w-[48px]' : 'h-[40px] w-[40px]'
      }`}
    >
      {icon}
    </View>
  );
}
