import { useRef, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoginBrandIcon } from '@/components/icons/LoginBrandIcon';
import { getApiErrorMessage } from '@/services/api-error';
import { useAuthStore } from '@/store/auth.store';
import { useAuth } from '../hooks/use-auth';

const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*[!@#$^*+=-])(?=.*[0-9]).{8,64}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginScreen() {
  const nameInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const setGuestMode = useAuthStore((s) => s.setGuestMode);
  const { loginWithLocal, isLoggingIn, loginError } = useAuth();

  const canSubmit = email.trim().length > 0 && password.length > 0;

  const handleBrowse = () => {
    setGuestMode();
    router.replace('/(tabs)');
  };

  const validateForm = (): string | null => {
    if (!email.trim()) return '이메일을 입력해주세요.';
    if (!EMAIL_REGEX.test(email.trim())) {
      return '올바른 이메일 형식으로 입력해주세요.';
    }
    if (!PASSWORD_REGEX.test(password)) {
      return '비밀번호는 영문, 숫자, 특수문자를 포함해 8자 이상이어야 합니다.';
    }
    return null;
  };

  const handleLogin = async () => {
    if (!canSubmit || isLoggingIn) return;

    const validationMessage = validateForm();
    if (validationMessage) {
      setFormError(validationMessage);
      return;
    }

    try {
      setFormError(null);
      await loginWithLocal({
        email: email.trim(),
        name: name.trim() || undefined,
        password,
      });
      router.replace('/(tabs)');
    } catch {
      // React Query exposes the error state for rendering.
    }
  };

  return (
    <LinearGradient
      colors={['#50DB42', '#FFD4D6']}
      locations={[0.02, 0.82]}
      style={{ flex: 1 }}
    >
      <SafeAreaView className="flex-1" edges={['top', 'bottom']}>
        <View className="flex-1 px-[34px]">
          <Pressable
            onPress={handleBrowse}
            className="mt-[9px] h-[30px] w-[73px] items-center justify-center rounded-[15px] bg-white"
          >
            <Text className="font-pt-600 text-[14px] leading-[25px] tracking-[-0.28px] text-[#0f0c0c]">
              둘러보기
            </Text>
          </Pressable>

          <View className="mt-[68px] items-center">
            <LoginBrandIcon width={89} height={131} />
          </View>

          <View className="mt-[103px]">
            <Text className="font-pt-900 text-[42px] leading-[51px] text-black">
              Welcome
            </Text>
            <Text className="mt-[4px] font-pt-500 text-[11px] text-black">
              잠시 머물 서식지 찾아줄, 나만의 다이노스
            </Text>
          </View>

          <View className="mt-[25px] gap-[10px]">
            <TextInput
              value={email}
              onChangeText={(value) => {
                setEmail(value);
                setFormError(null);
              }}
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isLoggingIn}
              keyboardType="email-address"
              returnKeyType="next"
              textContentType="emailAddress"
              onSubmitEditing={() => nameInputRef.current?.focus()}
              placeholder="테스트 이메일"
              placeholderTextColor="#7a7a7a"
              className="h-[46px] rounded-[5px] bg-white px-[14px] font-pt-500 text-[16px] text-black"
            />
            <TextInput
              ref={nameInputRef}
              value={name}
              onChangeText={setName}
              autoCorrect={false}
              editable={!isLoggingIn}
              returnKeyType="next"
              textContentType="name"
              onSubmitEditing={() => passwordInputRef.current?.focus()}
              placeholder="이름 (선택)"
              placeholderTextColor="#7a7a7a"
              className="h-[46px] rounded-[5px] bg-white px-[14px] font-pt-500 text-[16px] text-black"
            />
            <TextInput
              ref={passwordInputRef}
              value={password}
              onChangeText={(value) => {
                setPassword(value);
                setFormError(null);
              }}
              editable={!isLoggingIn}
              returnKeyType="done"
              secureTextEntry
              textContentType="password"
              onSubmitEditing={handleLogin}
              placeholder="비밀번호"
              placeholderTextColor="#7a7a7a"
              className="h-[46px] rounded-[5px] bg-white px-[14px] font-pt-500 text-[16px] text-black"
            />
            <Pressable
              onPress={handleLogin}
              disabled={!canSubmit || isLoggingIn}
              className={`h-[46px] items-center justify-center rounded-[5px] ${
                canSubmit && !isLoggingIn ? 'bg-black' : 'bg-black/40'
              }`}
            >
              <Text className="font-pt-600 text-[17px] text-white">
                {isLoggingIn ? '로그인 중' : '테스트 로그인'}
              </Text>
            </Pressable>
          </View>

          {formError || loginError ? (
            <Text className="mt-[10px] font-pt-500 text-[12px] leading-[17px] text-[#B42318]">
              {formError ??
                getApiErrorMessage(loginError, '로그인에 실패했습니다.')}
            </Text>
          ) : null}

          <Text className="mt-auto mb-[21px] font-pt-400 text-[8px] leading-[11px] text-black">
            회원가입 시 다이노스 서비스 필수 동의 항목인 개인정보처리방침과
            {'\n'}
            서비스 이용약관에 동의한 것으로 간주합니다.
          </Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
