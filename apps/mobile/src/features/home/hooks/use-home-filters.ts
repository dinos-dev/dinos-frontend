import { useCallback, useRef, useState } from 'react';
import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { CATEGORY_OPTIONS, RADIUS_OPTIONS } from '../mock/home-data';

export function useHomeFilters() {
  const [category, setCategory] = useState('all');
  const [radius, setRadius] = useState('nearest');

  const categorySheetRef = useRef<BottomSheetModal>(null);
  const radiusSheetRef = useRef<BottomSheetModal>(null);

  const openCategorySheet = useCallback(() => {
    categorySheetRef.current?.present();
  }, []);

  const openRadiusSheet = useCallback(() => {
    radiusSheetRef.current?.present();
  }, []);

  const categoryLabel =
    CATEGORY_OPTIONS.find((o) => o.value === category)?.label ?? '전체';
  const radiusLabel =
    RADIUS_OPTIONS.find((o) => o.value === radius)?.label ?? '가까운순';

  return {
    category,
    setCategory,
    radius,
    setRadius,
    categoryLabel,
    radiusLabel,
    categorySheetRef,
    radiusSheetRef,
    openCategorySheet,
    openRadiusSheet,
  };
}
