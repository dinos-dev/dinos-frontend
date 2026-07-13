import { forwardRef, useCallback, useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import type { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import { CloseIcon } from '@/components/icons';
import { useSearchRestaurants } from '../api/queries';
import { useSearchHistory } from '../hooks/use-search-history';
import type {
  SearchRestaurantDto,
  RecentSearchRecord,
} from '../types/map.types';
import { SearchInput } from './SearchInput';
import { SearchResultItem } from './SearchResultItem';
import { RecentSearchItem } from './RecentSearchItem';

interface SearchOverlayProps {
  location: { latitude: number; longitude: number };
  onSelectResult: (latitude: number, longitude: number) => void;
  onDismiss: () => void;
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

function ListState({ message }: { message: string }) {
  return (
    <View className="h-[96px] items-center justify-center px-5">
      <Text className="font-pt-400 text-[13px] text-[#747774]">{message}</Text>
    </View>
  );
}

export const SearchOverlay = forwardRef<BottomSheetModal, SearchOverlayProps>(
  function SearchOverlay({ location, onSelectResult, onDismiss }, ref) {
    const { history, addToHistory, removeFromHistory } = useSearchHistory();
    const [inputValue, setInputValue] = useState('');
    const debouncedKeyword = useDebounce(inputValue.trim(), 300);
    const snapPoints = useMemo(() => ['94%'], []);
    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.2}
        />
      ),
      [],
    );

    const searchParams =
      debouncedKeyword.length >= 1
        ? {
            latitude: location.latitude,
            longitude: location.longitude,
            keyword: debouncedKeyword,
            limit: 50,
          }
        : null;

    const {
      data: results = [],
      isError,
      isFetching,
    } = useSearchRestaurants(searchParams);

    const handleSelectResult = async (item: SearchRestaurantDto) => {
      await addToHistory({
        restaurantId: item.id,
        name: item.name,
        address: item.address,
        category: item.category,
        distanceKm: item.distanceKm,
        latitude: item.latitude,
        longitude: item.longitude,
      });
      onSelectResult(item.latitude, item.longitude);
    };

    const handleSelectRecent = (item: RecentSearchRecord) => {
      onSelectResult(item.latitude, item.longitude);
    };

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={styles.hiddenHandle}
        backgroundStyle={styles.background}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize"
        enableDynamicSizing={false}
      >
        <View style={styles.header}>
          <Pressable onPress={onDismiss} style={styles.closeButton}>
            <CloseIcon size={37} />
          </Pressable>
          <Text style={styles.title} numberOfLines={1} adjustsFontSizeToFit>
            가고싶은 곳이 있나요?
          </Text>
          <View style={styles.inputWrap}>
            <SearchInput value={inputValue} onChangeText={setInputValue} />
          </View>
        </View>

        {inputValue.trim().length === 0 ? (
          <>
            <Text className="font-pt-600 text-[14px] leading-[24px] text-[#0e0f0c] px-5 mt-[24px]">
              최근 검색기록
            </Text>
            <BottomSheetFlatList
              data={history}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <RecentSearchItem
                  item={item}
                  onPress={handleSelectRecent}
                  onRemove={removeFromHistory}
                />
              )}
              contentContainerStyle={{ paddingTop: 8 }}
              ListEmptyComponent={
                <ListState message="최근 검색기록이 없습니다" />
              }
              keyboardShouldPersistTaps="handled"
            />
          </>
        ) : (
          <BottomSheetFlatList
            data={results}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <SearchResultItem
                item={item}
                keyword={debouncedKeyword}
                onPress={handleSelectResult}
              />
            )}
            contentContainerStyle={{ paddingTop: 24 }}
            ListEmptyComponent={
              <ListState
                message={
                  isFetching
                    ? '검색 중입니다'
                    : isError
                      ? '검색 결과를 불러오지 못했습니다'
                      : '검색 결과가 없습니다'
                }
              />
            }
            keyboardShouldPersistTaps="handled"
          />
        )}
      </BottomSheetModal>
    );
  },
);

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  closeButton: {
    width: 37,
    height: 37,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  title: {
    marginTop: 21,
    marginBottom: 27,
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 24,
    lineHeight: 32,
    color: '#0f0c0c',
  },
  inputWrap: {
    width: '100%',
  },
  background: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    backgroundColor: '#fff',
  },
  hiddenHandle: {
    width: 0,
    height: 0,
  },
});
