export type RiskSeverity = 'critical' | 'high' | 'medium' | 'low' | 'safe';

export type StatusLevel = 'critical' | 'vulnerable' | 'good' | 'optimal';

export interface ApiResponse<T> {
  data: T;
  message?: string;
  timestamp: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}
