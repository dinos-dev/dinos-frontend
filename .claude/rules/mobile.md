---
paths: ['apps/mobile/**']
---

## Mobile (Expo / React Native)

- Expo SDK 56, React Native 0.85
- Expo Router로 파일 기반 라우팅 (app/ 디렉토리)
- app/ 에는 라우팅 진입점만, 비즈니스 로직 없음
- 네이티브 모듈 사용 시 expo-modules 우선
- SafeAreaView, KeyboardAvoidingView 필수 적용
- 플랫폼별 분기: Platform.OS 또는 .ios.tsx / .android.tsx
- 이미지: expo-image 사용
- 제스처: react-native-gesture-handler
