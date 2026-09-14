export interface User {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  isAnonymous: boolean;
  memberSince: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface PrivacyConsent {
  analyticsAllowed: boolean;
  externalScanAllowed: boolean;
  localHistoryStored: boolean;
  consentGrantedAt?: string;
}
