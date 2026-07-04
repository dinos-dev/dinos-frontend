import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useToastStore } from '@/store/toast.store';

const TOAST_COLORS = {
  error: 'bg-[#B42318]',
  success: 'bg-[#027A48]',
  info: 'bg-black',
} as const;

export function AppToast() {
  const message = useToastStore((s) => s.message);
  const type = useToastStore((s) => s.type);
  const hideToast = useToastStore((s) => s.hideToast);

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(hideToast, 2800);
    return () => clearTimeout(timer);
  }, [hideToast, message]);

  if (!message) return null;

  return (
    <View
      pointerEvents="box-none"
      className="absolute left-0 right-0 top-[56px] z-50 px-[20px]"
    >
      <View
        className={`rounded-[8px] px-[14px] py-[12px] ${TOAST_COLORS[type]}`}
      >
        <Text className="font-pt-600 text-[13px] leading-[18px] text-white">
          {message}
        </Text>
      </View>
    </View>
  );
}
