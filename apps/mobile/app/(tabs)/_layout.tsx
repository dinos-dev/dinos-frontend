import { Tabs } from 'expo-router';
import { TabBar } from '@/components/tab-bar';

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" options={{ title: '홈' }} />
      <Tabs.Screen name="map" options={{ title: '지도' }} />
      <Tabs.Screen name="mypage" options={{ title: '마이페이지' }} />
    </Tabs>
  );
}
