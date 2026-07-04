import { View, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeIcon, MapIcon, UserIcon } from '@/components/icons';

interface TabBarRoute {
  key: string;
  name: string;
}

interface TabBarProps {
  state: {
    routes: TabBarRoute[];
    index: number;
  };
  navigation: {
    navigate: (name: string) => void;
  };
}

export function TabBar({ state, navigation }: TabBarProps) {
  const insets = useSafeAreaInsets();
  const activeIndex = state.index;

  const handlePress = (name: string) => {
    navigation.navigate(name);
  };

  const homeRoute = state.routes[0];
  const mapRoute = state.routes[1];
  const mypageRoute = state.routes[2];

  const homeFocused = activeIndex === 0;
  const mapFocused = activeIndex === 1;
  const mypageFocused = activeIndex === 2;

  return (
    <View
      className="absolute bottom-0 left-6 right-6 flex-row items-center"
      style={{ paddingBottom: Math.max(insets.bottom, 16), gap: 14 }}
    >
      {/* 홈 탭 - 독립 원형 */}
      <Pressable
        onPress={() => homeRoute && handlePress(homeRoute.name)}
        style={styles.shadow}
        className={`w-[48px] h-[48px] rounded-full items-center justify-center ${
          homeFocused ? 'bg-white p-[4px]' : 'bg-white'
        }`}
      >
        {homeFocused ? (
          <View className="flex-1 w-full rounded-full bg-[#EBEBEA] items-center justify-center">
            <HomeIcon size={16} color="black" />
          </View>
        ) : (
          <HomeIcon size={16} color="black" />
        )}
      </Pressable>

      {/* 지도 + 마이페이지 - 하나의 연속 라운드 필 */}
      <View
        style={styles.shadow}
        className="flex-1 h-[48px] bg-white rounded-[24px] flex-row items-center px-[4px]"
      >
        <Pressable
          onPress={() => mapRoute && handlePress(mapRoute.name)}
          className={`flex-1 h-[40px] rounded-[20px] items-center justify-center ${
            mapFocused ? 'bg-[#EBEBEA]' : ''
          }`}
        >
          <MapIcon size={18} color="#2E2F34" />
        </Pressable>
        <Pressable
          onPress={() => mypageRoute && handlePress(mypageRoute.name)}
          className={`flex-1 h-[40px] rounded-[20px] items-center justify-center ${
            mypageFocused ? 'bg-[#EBEBEA]' : ''
          }`}
        >
          <UserIcon size={16} color="#2E2F34" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.09,
    shadowRadius: 5,
    elevation: 3,
  },
});
