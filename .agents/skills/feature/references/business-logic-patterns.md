# 비즈니스 로직 패턴

## Feature 내부 파일 구조

```
src/features/[name]/
  api/
    keys.ts           # Query Key Factory
    api.ts            # API 호출 함수 (axios)
    queries.ts        # React Query hooks (useQuery, useMutation, useInfiniteQuery)
    index.ts          # barrel export (keys + queries만 외부 노출)
  types/
    [name].types.ts   # 엔티티, 요청/응답, 파라미터 타입
  hooks/
    use-[name].ts     # 비즈니스 로직 훅 (UI 로직 조합)
  store/
    [name].store.ts   # Zustand 클라이언트 UI 상태
```

- `api.ts`: 순수 API 호출 함수. React Query와 무관하게 독립 테스트 가능
- `queries.ts`: React Query hook만. `api.ts` 함수를 queryFn으로 사용
- `keys.ts`: Query Key Factory. queries.ts와 캐시 invalidation에서 사용
- `hooks/`: API hook이 아닌 비즈니스 로직 조합 훅 (여러 query 조합, 계산, 이벤트 핸들러)

---

## 1. Query Key Factory

feature별 `api/keys.ts`에 정의. 계층 구조로 범위별 invalidation 지원.

```ts
// src/features/restaurant/api/keys.ts

export const restaurantKeys = {
  all: ['restaurant'] as const,
  lists: () => [...restaurantKeys.all, 'list'] as const,
  list: (filters: RestaurantFilters) =>
    [...restaurantKeys.lists(), filters] as const,
  details: () => [...restaurantKeys.all, 'detail'] as const,
  detail: (id: string) => [...restaurantKeys.details(), id] as const,
};
```

### 계층 invalidation 예시

```ts
// 모든 restaurant 관련 캐시 제거
queryClient.invalidateQueries({ queryKey: restaurantKeys.all });

// 모든 list 캐시만 제거 (detail은 유지)
queryClient.invalidateQueries({ queryKey: restaurantKeys.lists() });

// 특정 filter 조합의 list만 제거
queryClient.invalidateQueries({
  queryKey: restaurantKeys.list({ category: 'korean' }),
});
```

### 네이밍 규칙

- factory 변수명: `[entity]Keys` (camelCase)
- 복수형 메서드 (`lists`, `details`): 해당 카테고리 전체 매칭용
- 단수형 메서드 (`list`, `detail`): 특정 파라미터 매칭용

---

## 2. API 함수

순수 호출 함수. React/React Query 의존 없음. 테스트와 재사용이 목적.

```ts
// src/features/restaurant/api/api.ts

import { apiClient } from '@/services/api-client';
import type {
  Restaurant,
  RestaurantListResponse,
  RestaurantFilters,
  CreateRestaurantRequest,
} from '../types/restaurant.types';

export async function fetchRestaurants(
  filters: RestaurantFilters,
): Promise<RestaurantListResponse> {
  const { data } = await apiClient.get<RestaurantListResponse>('/restaurants', {
    params: filters,
  });
  return data;
}

export async function fetchRestaurantById(id: string): Promise<Restaurant> {
  const { data } = await apiClient.get<Restaurant>(`/restaurants/${id}`);
  return data;
}

export async function createRestaurant(
  body: CreateRestaurantRequest,
): Promise<Restaurant> {
  const { data } = await apiClient.post<Restaurant>('/restaurants', body);
  return data;
}

export async function deleteRestaurant(id: string): Promise<void> {
  await apiClient.delete(`/restaurants/${id}`);
}
```

### 규칙

- 함수명: `fetch` / `create` / `update` / `delete` + Entity
- 반환 타입 명시 (`Promise<T>`)
- `apiClient` 응답에서 `.data`를 추출해 반환 (axios wrapper 이므로)
- 에러 처리는 하지 않음 — interceptor 또는 React Query onError에서 처리

---

## 3. React Query Hooks

`api.ts` 함수를 queryFn으로 사용. hook은 React Query 설정만 담당.

```ts
// src/features/restaurant/api/queries.ts

import {
  useQuery,
  useMutation,
  useInfiniteQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { restaurantKeys } from './keys';
import {
  fetchRestaurants,
  fetchRestaurantById,
  createRestaurant,
  deleteRestaurant,
} from './api';
import type { RestaurantFilters } from '../types/restaurant.types';

// --- Query ---

export function useRestaurants(filters: RestaurantFilters) {
  return useQuery({
    queryKey: restaurantKeys.list(filters),
    queryFn: () => fetchRestaurants(filters),
  });
}

export function useRestaurantDetail(id: string) {
  return useQuery({
    queryKey: restaurantKeys.detail(id),
    queryFn: () => fetchRestaurantById(id),
    enabled: Boolean(id),
  });
}

// --- Infinite Query ---

export function useRestaurantsFeed(filters: RestaurantFilters) {
  return useInfiniteQuery({
    queryKey: restaurantKeys.list({ ...filters, type: 'feed' }),
    queryFn: ({ pageParam }) =>
      fetchRestaurants({ ...filters, cursor: pageParam }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });
}

// --- Mutation ---

export function useCreateRestaurant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRestaurant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: restaurantKeys.lists() });
    },
  });
}

export function useDeleteRestaurant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRestaurant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: restaurantKeys.all });
    },
  });
}
```

### Hook 네이밍

- Query: `use` + Entity (+ 용도) — `useRestaurants`, `useRestaurantDetail`
- Mutation: `use` + 동사 + Entity — `useCreateRestaurant`, `useDeleteRestaurant`
- Infinite: `use` + Entity + Feed/Infinite — `useRestaurantsFeed`

### Barrel Export

```ts
// src/features/restaurant/api/index.ts

export { restaurantKeys } from './keys';
export {
  useRestaurants,
  useRestaurantDetail,
  useCreateRestaurant,
  useDeleteRestaurant,
} from './queries';
```

- `api.ts`의 순수 함수는 외부에 노출하지 않음 (feature 내부에서만 사용)
- 외부 feature에서는 `import { useRestaurants } from '@/features/restaurant'`

---

## 4. 타입 정의

```ts
// src/features/restaurant/types/restaurant.types.ts

// --- 엔티티 ---
export interface Restaurant {
  id: string;
  name: string;
  category: string;
  rating: number;
  address: string;
  imageUrl: string | null;
  createdAt: string;
}

// --- API 응답 ---
export interface RestaurantListResponse {
  items: Restaurant[];
  nextCursor: string | null;
  totalCount: number;
}

// --- API 요청 파라미터 ---
export interface RestaurantFilters {
  category?: string;
  sortBy?: 'rating' | 'distance' | 'recent';
  cursor?: string;
  limit?: number;
}

// --- Mutation 요청 ---
export interface CreateRestaurantRequest {
  name: string;
  category: string;
  address: string;
}
```

### 네이밍 규칙

| 역할          | 패턴                                        | 예시                           |
| ------------- | ------------------------------------------- | ------------------------------ |
| 엔티티        | `Entity`                                    | `Restaurant`, `User`, `Review` |
| 목록 응답     | `EntityListResponse`                        | `RestaurantListResponse`       |
| 단일 응답     | `EntityDetailResponse` (엔티티와 다를 때만) | `RestaurantDetailResponse`     |
| 요청 파라미터 | `EntityFilters` / `EntityParams`            | `RestaurantFilters`            |
| 생성 요청     | `CreateEntityRequest`                       | `CreateRestaurantRequest`      |
| 수정 요청     | `UpdateEntityRequest`                       | `UpdateRestaurantRequest`      |
| 삭제          | 보통 `id: string`만 사용, 별도 타입 불필요  |                                |

- I prefix 사용하지 않음
- 파일명: `[entity].types.ts` (kebab-case)
- 한 feature에 타입이 많으면 도메인별로 분리 가능 (`restaurant.types.ts`, `review.types.ts`)

---

## 5. API Client

```ts
// src/services/api-client.ts

import axios from 'axios';
import type { AxiosError, InternalAxiosRequestConfig } from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// --- Auth token ---
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // TODO: 토큰 저장소에서 가져오기 (SecureStore 등)
  // const token = await getAccessToken();
  // if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// --- Error handling ---
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // TODO: 401 시 토큰 갱신 로직
    return Promise.reject(error);
  },
);
```

### 규칙

- 인스턴스 1개, `src/services/api-client.ts`
- auth, error, retry는 interceptor에서 중앙 처리
- feature에서는 `import { apiClient } from '@/services/api-client'`만 사용

---

## 6. 에러 처리

```ts
// src/services/api-error.ts

import type { AxiosError } from 'axios';

export interface ApiErrorResponse {
  code: string;
  message: string;
}

export function getApiErrorMessage(
  error: unknown,
  fallback = '알 수 없는 오류가 발생했습니다.',
): string {
  if (!isAxiosError(error)) return fallback;
  const data = error.response?.data as ApiErrorResponse | undefined;
  return data?.message ?? fallback;
}

function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError)?.isAxiosError === true;
}
```

### Mutation에서 에러 사용

```ts
const mutation = useCreateRestaurant();

const handleSubmit = async (data: CreateRestaurantRequest) => {
  try {
    await mutation.mutateAsync(data);
  } catch (error) {
    const message = getApiErrorMessage(error);
    // Toast 또는 Alert
  }
};
```

---

## 7. Optimistic Update

```ts
export function useToggleLike(restaurantId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => toggleLikeApi(restaurantId),
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: restaurantKeys.detail(restaurantId),
      });

      const previous = queryClient.getQueryData<Restaurant>(
        restaurantKeys.detail(restaurantId),
      );

      if (previous) {
        queryClient.setQueryData<Restaurant>(
          restaurantKeys.detail(restaurantId),
          {
            ...previous,
            isLiked: !previous.isLiked,
            likeCount: previous.isLiked
              ? previous.likeCount - 1
              : previous.likeCount + 1,
          },
        );
      }

      return { previous };
    },
    onError: (_error, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(
          restaurantKeys.detail(restaurantId),
          context.previous,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: restaurantKeys.detail(restaurantId),
      });
    },
  });
}
```

---

## 8. Zustand Store

클라이언트 UI 상태만. 서버 데이터 저장 금지.

```ts
// src/features/restaurant/store/restaurant.store.ts

import { create } from 'zustand';

interface RestaurantStoreState {
  selectedCategory: string | null;
  isFilterModalOpen: boolean;
}

interface RestaurantStoreActions {
  setSelectedCategory: (category: string | null) => void;
  toggleFilterModal: () => void;
}

export const useRestaurantStore = create<
  RestaurantStoreState & RestaurantStoreActions
>((set) => ({
  selectedCategory: null,
  isFilterModalOpen: false,

  setSelectedCategory: (category) => set({ selectedCategory: category }),
  toggleFilterModal: () =>
    set((state) => ({ isFilterModalOpen: !state.isFilterModalOpen })),
}));
```

### 규칙

- 파일명: `[feature].store.ts`
- State와 Actions 인터페이스 분리
- 서버 데이터(목록, 상세 등)는 React Query가 관리 — store에 넣지 않음
- persist 필요 시 zustand/middleware의 `persist` 사용
- 전역 상태는 `src/store/`에, feature 상태는 `src/features/[name]/store/`에 위치
