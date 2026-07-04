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
