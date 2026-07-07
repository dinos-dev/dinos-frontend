import { Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useAuthStore } from '@/store/auth.store';
import { useAuth, useMyProfile } from '@/features/auth';

export default function MypageTab() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const { logout, isLoggingOut } = useAuth();
  const { data: profile, isLoading } = useMyProfile(isAuthenticated);

  const handleLoginPress = () => {
    router.push('/login');
  };

  const handleLogoutPress = async () => {
    await logout();
    router.replace('/login');
  };

  if (!isAuthenticated) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-[24px]">
        <Text className="font-pt-700 text-[22px] text-black">마이페이지</Text>
        <Text className="mt-[10px] text-center font-pt-500 text-[14px] leading-[20px] text-[#496545]">
          테스트 로그인을 하면 프로필 정보와 로그아웃을 확인할 수 있어요.
        </Text>
        <Pressable
          onPress={handleLoginPress}
          className="mt-[24px] h-[46px] w-full items-center justify-center rounded-[5px] bg-black"
        >
          <Text className="font-pt-600 text-[16px] text-white">로그인</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white px-[24px] pt-[90px]">
      <Text className="font-pt-700 text-[24px] text-black">마이페이지</Text>

      <View className="mt-[24px] rounded-[8px] bg-dinos-section-bg px-[18px] py-[18px]">
        <Text className="font-pt-700 text-[18px] text-black">
          {profile?.profile?.nickname ?? profile?.name ?? '사용자'}
        </Text>
        <Text className="mt-[8px] font-pt-500 text-[13px] text-[#496545]">
          {isLoading ? '프로필을 불러오는 중' : profile?.email}
        </Text>

        <View className="mt-[18px] flex-row justify-between">
          <View>
            <Text className="font-pt-700 text-[18px] text-black">
              {profile?.friendCount ?? 0}
            </Text>
            <Text className="mt-[4px] font-pt-500 text-[12px] text-[#496545]">
              친구
            </Text>
          </View>
          <View>
            <Text className="font-pt-700 text-[18px] text-black">
              {profile?.reviewCount ?? 0}
            </Text>
            <Text className="mt-[4px] font-pt-500 text-[12px] text-[#496545]">
              리뷰
            </Text>
          </View>
          <View>
            <Text className="font-pt-700 text-[18px] text-black">
              {profile?.pendingFriendRequestCount ?? 0}
            </Text>
            <Text className="mt-[4px] font-pt-500 text-[12px] text-[#496545]">
              요청
            </Text>
          </View>
        </View>
      </View>

      <Pressable
        onPress={handleLogoutPress}
        disabled={isLoggingOut}
        className="mt-[24px] h-[46px] items-center justify-center rounded-[5px] bg-black"
      >
        <Text className="font-pt-600 text-[16px] text-white">
          {isLoggingOut ? '로그아웃 중' : '로그아웃'}
        </Text>
      </Pressable>
    </View>
  );
}
