import { Redirect } from 'expo-router';
import { useAuthStore } from '@/store/auth.store';

export default function IndexRoute() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const hasBrowsedAsGuest = useAuthStore((s) => s.hasBrowsedAsGuest);
  const isLoading = useAuthStore((s) => s.isLoading);

  if (isLoading) {
    return null;
  }

  if (isAuthenticated || hasBrowsedAsGuest) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/login" />;
}
