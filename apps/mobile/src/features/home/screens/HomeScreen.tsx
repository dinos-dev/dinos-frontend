import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SelectionSheet } from '@/components/bottom-sheet';
import { HomeHeader } from '../components/HomeHeader';
import { FilterRow } from '../components/FilterRow';
import { TopPlacesSection } from '../components/TopPlacesSection';
import { FriendSection } from '../components/FriendSection';
import { useHomeFilters } from '../hooks/use-home-filters';
import {
  MOCK_PLACES,
  MOCK_FRIENDS,
  CATEGORY_OPTIONS,
  RADIUS_OPTIONS,
} from '../mock/home-data';

export function HomeScreen() {
  const {
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
  } = useHomeFilters();

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <HomeHeader />
      <FilterRow
        categoryLabel={categoryLabel}
        radiusLabel={radiusLabel}
        onCategoryPress={openCategorySheet}
        onRadiusPress={openRadiusSheet}
      />
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-[100px]"
      >
        <TopPlacesSection places={MOCK_PLACES} username="양념" />
        <FriendSection friends={MOCK_FRIENDS} />
      </ScrollView>

      <SelectionSheet
        ref={categorySheetRef}
        title="업종"
        options={CATEGORY_OPTIONS}
        selectedValue={category}
        onSelect={setCategory}
      />
      <SelectionSheet
        ref={radiusSheetRef}
        title="반경 설정"
        options={RADIUS_OPTIONS}
        selectedValue={radius}
        onSelect={setRadius}
      />
    </SafeAreaView>
  );
}
