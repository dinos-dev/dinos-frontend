import { apiClient } from '@/services/api-client';
import type { ApiResponse } from '@/services/api-types';
import type {
  SearchRestaurantDto,
  NearbyPinDto,
  SearchParams,
  NearbyPinsParams,
} from '../types/map.types';

function unwrapResult<T>(response: ApiResponse<T>): T {
  if (response.result === undefined) {
    throw new Error(response.message);
  }
  return response.result;
}

export async function searchRestaurants(
  params: SearchParams,
): Promise<SearchRestaurantDto[]> {
  const { data } = await apiClient.get<ApiResponse<SearchRestaurantDto[]>>(
    '/restaurant/search',
    { params },
  );
  return unwrapResult(data);
}

export async function fetchNearbyPins(
  params: NearbyPinsParams,
): Promise<NearbyPinDto[]> {
  const { data } = await apiClient.get<ApiResponse<NearbyPinDto[]>>(
    '/pins/nearby',
    { params },
  );
  return unwrapResult(data);
}
