import { useCallback, useRef, useState } from 'react';
import { View } from 'react-native';
import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import {
  NaverMapView,
  type Camera,
  type CameraChangeReason,
  type Region,
} from '@mj-studio/react-native-naver-map';
import { useCurrentLocation } from '../hooks/use-current-location';
import { useMapCamera } from '../hooks/use-map-camera';
import { useNearbyPins } from '../api/queries';
import { useMapStore } from '../store/map.store';
import type { NearbyPinsParams } from '../types/map.types';
import { MapSearchBar } from '../components/MapSearchBar';
import { PinReviewToggle } from '../components/PinReviewToggle';
import { CurrentLocationButton } from '../components/CurrentLocationButton';
import { PinMarker } from '../components/PinMarker';
import { SearchOverlay } from '../components/SearchOverlay';

function roundTo3(n: number) {
  return Math.round(n * 1000) / 1000;
}

export function MapScreen() {
  const { location, requestLocation } = useCurrentLocation();
  const { mapRef, moveTo } = useMapCamera();
  const searchSheetRef = useRef<BottomSheetModal>(null);
  const selectPin = useMapStore((s) => s.selectPin);

  const [nearbyParams, setNearbyParams] = useState<NearbyPinsParams | null>(
    null,
  );
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { data: pins = [] } = useNearbyPins(nearbyParams);

  const handleCameraChanged = useCallback(
    (params: Camera & { reason: CameraChangeReason; region: Region }) => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => {
        const { latitude, longitude, region } = params;
        const minLat = region.latitude;
        const maxLat = region.latitude + region.latitudeDelta;
        const minLng = region.longitude;
        const maxLng = region.longitude + region.longitudeDelta;
        setNearbyParams({
          userLat: roundTo3(latitude),
          userLng: roundTo3(longitude),
          minLat: roundTo3(minLat),
          maxLat: roundTo3(maxLat),
          minLng: roundTo3(minLng),
          maxLng: roundTo3(maxLng),
        });
      }, 500);
    },
    [],
  );

  const handleMoveToCurrentLocation = useCallback(async () => {
    const coords = await requestLocation();
    moveTo(coords.latitude, coords.longitude, 15);
  }, [requestLocation, moveTo]);

  const handleSelectResult = useCallback(
    (latitude: number, longitude: number) => {
      searchSheetRef.current?.dismiss();
      moveTo(latitude, longitude, 15);
    },
    [moveTo],
  );

  const handleOpenSearch = useCallback(() => {
    searchSheetRef.current?.present();
  }, []);

  const handleCloseSearch = useCallback(() => {
    searchSheetRef.current?.dismiss();
  }, []);

  return (
    <View className="flex-1">
      <NaverMapView
        ref={mapRef}
        style={{ flex: 1 }}
        initialCamera={{
          latitude: location.latitude,
          longitude: location.longitude,
          zoom: 14,
        }}
        onCameraChanged={handleCameraChanged}
      >
        {pins.map((pin) => (
          <PinMarker
            key={pin.pinId}
            latitude={pin.latitude}
            longitude={pin.longitude}
            onTap={() => selectPin(pin.pinId)}
          />
        ))}
      </NaverMapView>

      <MapSearchBar onPress={handleOpenSearch} />
      <PinReviewToggle />
      <CurrentLocationButton onPress={handleMoveToCurrentLocation} />

      <SearchOverlay
        ref={searchSheetRef}
        location={location}
        onSelectResult={handleSelectResult}
        onDismiss={handleCloseSearch}
      />
    </View>
  );
}
