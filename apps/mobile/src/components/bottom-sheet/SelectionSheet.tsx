import { useCallback, useMemo, forwardRef } from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetFlatList,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import type { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import { CheckIcon } from '@/components/icons';
import type { SelectionOption } from '@/features/home/types';

interface SelectionSheetProps {
  title: string;
  options: SelectionOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

export const SelectionSheet = forwardRef<BottomSheetModal, SelectionSheetProps>(
  function SelectionSheet({ title, options, selectedValue, onSelect }, ref) {
    const snapPoints = useMemo(
      () => [options.length * 59 + 60],
      [options.length],
    );

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.6}
        />
      ),
      [],
    );

    const handleSelect = useCallback(
      (value: string) => {
        onSelect(value);
        if (ref && 'current' in ref && ref.current) {
          ref.current.dismiss();
        }
      },
      [onSelect, ref],
    );

    const renderItem = useCallback(
      ({ item }: { item: SelectionOption }) => {
        const isSelected = item.value === selectedValue;
        return (
          <Pressable
            onPress={() => handleSelect(item.value)}
            style={styles.item}
          >
            <Text
              style={[styles.itemText, isSelected && styles.itemTextSelected]}
            >
              {item.label}
            </Text>
            {isSelected && <CheckIcon size={17} />}
          </Pressable>
        );
      },
      [selectedValue, handleSelect],
    );

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={styles.handle}
        backgroundStyle={styles.background}
      >
        <Text style={styles.title}>{title}</Text>
        <BottomSheetFlatList
          data={options}
          keyExtractor={(item) => item.value}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      </BottomSheetModal>
    );
  },
);

const styles = StyleSheet.create({
  background: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: 1,
    borderColor: '#d5d2d2',
  },
  handle: {
    backgroundColor: '#D5D2D2',
    width: 40,
  },
  title: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 14,
    color: '#0F0C0C',
    textAlign: 'center',
    paddingVertical: 13,
  },
  listContent: {
    paddingHorizontal: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 19,
  },
  itemText: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 14,
    color: '#0F0C0C',
    letterSpacing: -0.28,
  },
  itemTextSelected: {
    fontFamily: 'Pretendard-ExtraBold',
  },
});
