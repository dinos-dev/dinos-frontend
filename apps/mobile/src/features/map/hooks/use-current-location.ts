import { useState, useCallback } from 'react';
import * as Location from 'expo-location';

const DEFAULT_LOCATION = { latitude: 37.5665, longitude: 126.978 };

export function useCurrentLocation() {
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [isLoading, setIsLoading] = useState(false);

  const requestLocation = useCallback(async () => {
    setIsLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setIsLoading(false);
        return DEFAULT_LOCATION;
      }
      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      const coords = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      setLocation(coords);
      setIsLoading(false);
      return coords;
    } catch {
      setIsLoading(false);
      return DEFAULT_LOCATION;
    }
  }, []);

  return { location, isLoading, requestLocation };
}
