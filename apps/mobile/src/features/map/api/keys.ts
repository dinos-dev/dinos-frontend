import type { NearbyPinsParams, SearchParams } from '../types/map.types';

export const mapKeys = {
  all: ['map'] as const,
  search: (params: SearchParams) => [...mapKeys.all, 'search', params] as const,
  nearbyPins: (params: NearbyPinsParams) =>
    [...mapKeys.all, 'nearbyPins', params] as const,
};
