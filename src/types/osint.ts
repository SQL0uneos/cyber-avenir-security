export type OsintTargetType = 'username' | 'email' | 'domain' | 'name';

export interface OsintQuery {
  targetType: OsintTargetType;
  targetValue: string;
}

export interface OsintNormalizedResult {
  id: string;
  provider: string;
  category: 'social' | 'code' | 'breach' | 'paste' | 'dns' | 'search';
  target: string;
  url?: string;
  title: string;
  confidence: number; // 0.0 - 1.0
  metadata: Record<string, string | number | boolean>;
  discoveredAt: string;
}

export interface IdentityRelation {
  id: string;
  sourceEntity: string;
  targetEntity: string;
  relationType: 'uses_username' | 'linked_email' | 'registered_domain' | 'exposed_in';
  confidence: number;
}

export interface DigitalIdentity {
  id: string;
  primaryIdentifier: string;
  aliases: string[];
  usernames: string[];
  emails: string[];
  platforms: string[];
  domains: string[];
  relations: IdentityRelation[];
  confidenceScore: number; // 0-100
  exposureLevel: 'low' | 'moderate' | 'high' | 'critical';
  updatedAt: string;
}

export interface OsintSearchResult {
  query: OsintQuery;
  results: OsintNormalizedResult[];
  digitalIdentity: DigitalIdentity;
  totalFound: number;
  durationMs: number;
  searchedAt: string;
}
