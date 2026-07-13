import { useState, useEffect, useCallback, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { RecentSearchRecord } from '../types/map.types';

const STORAGE_KEY = '@dinos/search-history';
const MAX_ITEMS = 20;

function toRecentSearchRecord(value: unknown): RecentSearchRecord | null {
  if (!value || typeof value !== 'object') return null;
  const record = value as Partial<RecentSearchRecord>;

  if (
    typeof record.name !== 'string' ||
    typeof record.address !== 'string' ||
    typeof record.latitude !== 'number' ||
    typeof record.longitude !== 'number'
  ) {
    return null;
  }

  const id =
    typeof record.id === 'string'
      ? record.id
      : `${record.restaurantId ?? `${record.name}:${record.address}`}`;

  return {
    id,
    restaurantId:
      typeof record.restaurantId === 'number' ? record.restaurantId : undefined,
    name: record.name,
    address: record.address,
    category: typeof record.category === 'string' ? record.category : null,
    distanceKm: typeof record.distanceKm === 'number' ? record.distanceKm : 0,
    latitude: record.latitude,
    longitude: record.longitude,
    searchedAt:
      typeof record.searchedAt === 'number' ? record.searchedAt : Date.now(),
  };
}

function getRecordKey(
  record: Pick<RecentSearchRecord, 'restaurantId' | 'name' | 'address'>,
) {
  return typeof record.restaurantId === 'number'
    ? `restaurant:${record.restaurantId}`
    : `legacy:${record.name}:${record.address}`;
}

function parseHistory(raw: string): RecentSearchRecord[] {
  try {
    const value: unknown = JSON.parse(raw);
    if (!Array.isArray(value)) return [];
    const records = value
      .map(toRecentSearchRecord)
      .filter((record): record is RecentSearchRecord => record !== null);

    const seen = new Set<string>();
    const deduped: RecentSearchRecord[] = [];
    for (const record of records) {
      const key = getRecordKey(record);
      if (seen.has(key)) continue;
      seen.add(key);
      deduped.push(record);
    }

    return deduped.slice(0, MAX_ITEMS);
  } catch {
    return [];
  }
}

export function useSearchHistory() {
  const [history, setHistory] = useState<RecentSearchRecord[]>([]);
  const historyRef = useRef<RecentSearchRecord[]>([]);

  const updateHistory = useCallback((nextHistory: RecentSearchRecord[]) => {
    historyRef.current = nextHistory;
    setHistory(nextHistory);
  }, []);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (!raw) return;
      updateHistory(parseHistory(raw));
    });
  }, [updateHistory]);

  const addToHistory = useCallback(
    async (record: Omit<RecentSearchRecord, 'id' | 'searchedAt'>) => {
      const newRecord: RecentSearchRecord = {
        ...record,
        id: getRecordKey(record),
        searchedAt: Date.now(),
      };
      const nextKey = getRecordKey(newRecord);
      const updated = [
        newRecord,
        ...historyRef.current.filter((r) => getRecordKey(r) !== nextKey),
      ].slice(0, MAX_ITEMS);
      updateHistory(updated);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    },
    [updateHistory],
  );

  const removeFromHistory = useCallback(
    async (id: string) => {
      const updated = historyRef.current.filter((r) => r.id !== id);
      updateHistory(updated);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    },
    [updateHistory],
  );

  return { history, addToHistory, removeFromHistory };
}
