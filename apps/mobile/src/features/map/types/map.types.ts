export interface SearchRestaurantDto {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  category: string | null;
  primaryImageUrl: string | null;
  distanceKm: number;
}

export interface NearbyPinDto {
  pinId: number;
  restaurantId: number;
  restaurantName: string;
  latitude: number;
  longitude: number;
  address: string;
  category: string | null;
  distanceKm: number;
  pinnedAt: string;
}

export interface SearchParams {
  latitude: number;
  longitude: number;
  keyword: string;
  radiusMeters?: number;
  limit?: number;
}

export interface NearbyPinsParams {
  userLat: number;
  userLng: number;
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
  limit?: number;
}

export interface RecentSearchRecord {
  id: string;
  restaurantId?: number;
  name: string;
  address: string;
  category: string | null;
  distanceKm: number;
  latitude: number;
  longitude: number;
  searchedAt: number;
}
