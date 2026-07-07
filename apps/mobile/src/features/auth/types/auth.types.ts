export interface LocalLoginRequest {
  email: string;
  name?: string;
  password: string;
}

export interface LoginTokens {
  accessToken: string;
  refreshToken: string;
}

export interface UserProfile {
  userId: number;
  email: string;
  name: string | null;
  profile: {
    nickname: string;
    comment: string | null;
    headerId: number | null;
    bodyId: number | null;
    headerColor: string | null;
    bodyColor: string | null;
  } | null;
  inviteCode: string | null;
  pendingFriendRequestCount: number;
  reviewCount: number;
  friendCount: number;
}
