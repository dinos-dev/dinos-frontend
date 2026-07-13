import { useQuery } from '@tanstack/react-query';
import { searchRestaurants, fetchNearbyPins } from './api';
import { mapKeys } from './keys';
import type { SearchParams, NearbyPinsParams } from '../types/map.types';

export function useSearchRestaurants(params: SearchParams | null) {
  return useQuery({
    queryKey: params ? mapKeys.search(params) : mapKeys.all,
    queryFn: () => searchRestaurants(params!),
    enabled: !!params && params.keyword.trim().length >= 1,
  });
}

export function useNearbyPins(params: NearbyPinsParams | null) {
  return useQuery({
    queryKey: params ? mapKeys.nearbyPins(params) : mapKeys.all,
    queryFn: () => fetchNearbyPins(params!),
    enabled: !!params,
    staleTime: 30 * 1000,
  });
}
