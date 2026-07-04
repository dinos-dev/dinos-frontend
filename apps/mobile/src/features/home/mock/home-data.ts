import type { Place, Friend, SelectionOption } from '../types';

export const MOCK_PLACES: Place[] = [
  {
    id: '1',
    name: '베베르카',
    address: '인천 부평구 천보로 173',
    imageUrl: undefined,
    isNew: true,
    savedBy: {
      id: 'u1',
      name: '나는멋쟁이',
      avatarUrl: 'https://picsum.photos/seed/user1/100',
    },
  },
  {
    id: '2',
    name: '오아시스 부평점',
    address: '서울 한남동 153-5',
    imageUrl: 'https://picsum.photos/seed/place2/200',
    isNew: false,
    savedBy: {
      id: 'u2',
      name: '사랑이',
      avatarUrl: 'https://picsum.photos/seed/user2/100',
    },
  },
  {
    id: '3',
    name: '육회사랑',
    address: '서울 동대문구 25',
    imageUrl: 'https://picsum.photos/seed/place3/200',
    isNew: false,
    savedBy: {
      id: 'u3',
      name: '하은민',
      avatarUrl: 'https://picsum.photos/seed/user3/100',
    },
  },
  {
    id: '4',
    name: '스시오마카세',
    address: '서울 강남구 역삼동 12',
    imageUrl: 'https://picsum.photos/seed/place4/200',
    isNew: true,
    savedBy: {
      id: 'u4',
      name: '먹짱',
      avatarUrl: 'https://picsum.photos/seed/user4/100',
    },
  },
  {
    id: '5',
    name: '파스타공방',
    address: '서울 마포구 연남동 88',
    imageUrl: 'https://picsum.photos/seed/place5/200',
    isNew: false,
    savedBy: {
      id: 'u5',
      name: '요리왕',
      avatarUrl: 'https://picsum.photos/seed/user5/100',
    },
  },
];

export const MOCK_FRIENDS: Friend[] = [
  {
    id: 'f1',
    name: '다빈이',
    avatarUrl: 'https://picsum.photos/seed/friend1/200',
    savedPlaceName: '육회사랑',
    friendCount: 2,
  },
  {
    id: 'f2',
    name: 'sim_cute',
    avatarUrl: 'https://picsum.photos/seed/friend2/200',
    savedPlaceName: '육회사랑',
    friendCount: 1,
  },
  {
    id: 'f3',
    name: '랄랄라',
    avatarUrl: 'https://picsum.photos/seed/friend3/200',
    savedPlaceName: '육회사랑',
  },
  {
    id: 'f4',
    name: 'seeun',
    avatarUrl: 'https://picsum.photos/seed/friend4/200',
    savedPlaceName: '육회사랑',
  },
];

export const CATEGORY_OPTIONS: SelectionOption[] = [
  { label: '전체', value: 'all' },
  { label: '한식', value: 'korean' },
  { label: '일식', value: 'japanese' },
  { label: '중식', value: 'chinese' },
  { label: '양식', value: 'western' },
  { label: '세계음식', value: 'world' },
  { label: '디저트', value: 'dessert' },
];

export const RADIUS_OPTIONS: SelectionOption[] = [
  { label: '100m', value: '100' },
  { label: '가까운순', value: 'nearest' },
  { label: '500m', value: '500' },
  { label: '1km', value: '1000' },
  { label: '3km', value: '3000' },
  { label: '5km', value: '5000' },
];
