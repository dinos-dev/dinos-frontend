import type { AxiosError } from 'axios';

export interface ApiErrorResponse {
  status: number;
  message: string;
  error: string;
}

const ERROR_MESSAGES: Record<string, string> = {
  VALIDATE_ERROR: '입력값이 유효하지 않습니다. 다시 확인해주세요.',
  EXIST_LOCAL_ACCOUNT: '이미 가입된 이메일입니다. 같은 정보로 로그인해주세요.',
  EXIST_GOOGLE_ACCOUNT: '구글로 가입된 계정입니다.',
  EXIST_NAVER_ACCOUNT: '네이버로 가입된 계정입니다.',
  EXIST_APPLE_ACCOUNT: 'Apple로 가입된 계정입니다.',
  EXIST_KAKAO_ACCOUNT: '카카오로 가입된 계정입니다.',
  NOT_FOUND_TOKEN: '로그인이 필요합니다.',
  INVALID_TOKEN: '로그인 정보가 유효하지 않습니다. 다시 로그인해주세요.',
  EXPIRED_TOKEN: '로그인이 만료되었습니다. 다시 로그인해주세요.',
  INVALID_TOKEN_FORMAT: '로그인 정보가 유효하지 않습니다. 다시 로그인해주세요.',
  UNAUTHORIZED_INVALID_SIGNATURE:
    '로그인 정보가 유효하지 않습니다. 다시 로그인해주세요.',
};

export function getApiErrorMessage(
  error: unknown,
  fallback = '알 수 없는 오류가 발생했습니다.',
): string {
  if (!isAxiosError(error)) return fallback;

  if (!error.response) {
    return '네트워크 연결을 확인해주세요.';
  }

  const data = error.response?.data as ApiErrorResponse | undefined;
  if (data?.error && ERROR_MESSAGES[data.error]) {
    return ERROR_MESSAGES[data.error];
  }

  return data?.message ?? fallback;
}

function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError)?.isAxiosError === true;
}
