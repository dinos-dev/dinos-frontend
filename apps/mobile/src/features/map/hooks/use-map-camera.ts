import { useRef, useCallback } from 'react';
import type { NaverMapViewRef } from '@mj-studio/react-native-naver-map';

export function useMapCamera() {
  const mapRef = useRef<NaverMapViewRef>(null);

  const moveTo = useCallback(
    (latitude: number, longitude: number, zoom = 15) => {
      mapRef.current?.animateCameraTo({
        latitude,
        longitude,
        zoom,
        duration: 500,
      });
    },
    [],
  );

  return { mapRef, moveTo };
}
