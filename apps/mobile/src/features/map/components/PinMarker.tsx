import React from 'react';
import { NaverMapMarkerOverlay } from '@mj-studio/react-native-naver-map';

interface PinMarkerProps {
  latitude: number;
  longitude: number;
  onTap?: () => void;
}

export const PinMarker = React.memo(function PinMarker({
  latitude,
  longitude,
  onTap,
}: PinMarkerProps) {
  return (
    <NaverMapMarkerOverlay
      latitude={latitude}
      longitude={longitude}
      onTap={onTap}
    />
  );
});
