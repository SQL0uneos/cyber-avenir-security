import { RiskSeverity, StatusLevel } from './common';

export type SecurityCategoryType =
  | 'accounts'
  | 'mfa'
  | 'passwords'
  | 'email_exposure'
  | 'devices'
  | 'social_accounts'
  | 'recovery_methods';

export interface SecuritySignal {
  id: string;
  category: SecurityCategoryType;
  severity: RiskSeverity;
  weight: number; // impact points deducted (e.g. 25)
  source: string;
  title: string;
  description: string;
  confidence: number; // 0 to 1
  timestamp: string;
}

export interface SecurityCategoryScore {
  category: SecurityCategoryType;
  label: string;
  score: number; // 0-100
  totalItems: number;
  secureItems: number;
  risksCount: number;
  iconName: string;
}

export interface SecurityRisk {
  id: string;
  category: SecurityCategoryType;
  severity: RiskSeverity;
  title: string;
  description: string;
  affectedTarget: string;
  remediationAction: string;
  dateDetected: string;
  isResolved: boolean;
}

export interface SecurityRecommendation {
  id: string;
  riskId?: string;
  category: SecurityCategoryType;
  title: string;
  summary: string;
  impactScoreBonus: number; // points gained if resolved (e.g. +15)
  priority: 'urgent' | 'important' | 'suggested';
  actionUrl?: string;
  estimatedMinutes: number;
}

export interface SecurityScore {
  score: number; // 0-100
  level: StatusLevel;
  statusLabel: string;
  summaryText: string;
  categories: SecurityCategoryScore[];
  topRisks: SecurityRisk[];
  recommendations: SecurityRecommendation[];
  signalsCount: number;
  lastCalculatedAt: string;
}
