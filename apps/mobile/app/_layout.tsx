import '../global.css';

import { useCallback, useEffect } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getAccessToken } from '@/services/token-storage';
import { useAuthStore } from '@/store/auth.store';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1,
    },
  },
});

function AuthInitializer({ children }: { children: React.ReactNode }) {
  const setLoading = useAuthStore((s) => s.setLoading);
  const setUser = useAuthStore((s) => s.setUser);
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const isLoading = useAuthStore((s) => s.isLoading);

  useEffect(() => {
    async function checkAuth() {
      try {
        const token = await getAccessToken();
        if (!token) {
          clearAuth();
          return;
        }
        // TODO: 토큰으로 유저 정보 조회 API 호출
        clearAuth(); // 임시: 토큰 있어도 유저 조회 미구현
      } catch {
        clearAuth();
      }
    }
    checkAuth();
  }, [setLoading, setUser, clearAuth]);

  const onLayoutReady = useCallback(async () => {
    if (!isLoading) {
      await SplashScreen.hideAsync();
    }
  }, [isLoading]);

  useEffect(() => {
    onLayoutReady();
  }, [onLayoutReady]);

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <BottomSheetModalProvider>
          <AuthInitializer>
            <Stack screenOptions={{ headerShown: false }} />
          </AuthInitializer>
        </BottomSheetModalProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
