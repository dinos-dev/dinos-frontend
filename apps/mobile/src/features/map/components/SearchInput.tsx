import { Pressable, StyleSheet, View } from 'react-native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { SearchIcon, SearchClearIcon } from '@/components/icons';

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

export function SearchInput({ value, onChangeText }: SearchInputProps) {
  return (
    <View style={styles.container}>
      <SearchIcon size={20} color="#0E0F0C" />
      <BottomSheetTextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="검색"
        placeholderTextColor="#f1f1ed"
        autoFocus
        style={styles.input}
        returnKeyType="search"
      />
      {value.length > 0 && (
        <Pressable onPress={() => onChangeText('')} hitSlop={8}>
          <SearchClearIcon size={24} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 43,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0e0f0c',
    borderRadius: 21.5,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 16,
    color: '#0e0f0c',
  },
});
