import { ApiResponse } from '../types/common';
import { NetworkError } from './errors';

export interface ApiClientConfig {
  baseUrl: string;
  timeoutMs: number;
}

const DEFAULT_CONFIG: ApiClientConfig = {
  baseUrl: process.env.EXPO_PUBLIC_API_URL || 'https://api.cyberavenir.org/v1',
  timeoutMs: 10000,
};

export class ApiClient {
  private config: ApiClientConfig;

  constructor(config?: Partial<ApiClientConfig>) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  public async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  public async post<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit
  ): Promise<ApiResponse<T>> {
    const url = `${this.config.baseUrl}${endpoint}`;
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}`);
      }
      return (await response.json()) as ApiResponse<T>;
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new NetworkError('Délai d’attente dépassé (timeout)');
      }
      throw new NetworkError((error as Error).message);
    }
  }
}

export const apiClient = new ApiClient();
