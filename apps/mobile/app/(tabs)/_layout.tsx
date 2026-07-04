import { Tabs } from 'expo-router';
import { Redirect } from 'expo-router';
import { TabBar } from '@/components/tab-bar';
import { useAuthStore } from '@/store/auth.store';

export default function TabsLayout() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const hasBrowsedAsGuest = useAuthStore((s) => s.hasBrowsedAsGuest);
  const isLoading = useAuthStore((s) => s.isLoading);

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated && !hasBrowsedAsGuest) {
    return <Redirect href="/login" />;
  }

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
