import { SecurityCategoryType, SecurityRisk, SecurityRecommendation } from './score';

export type AccountStatus = 'secure' | 'warning' | 'critical' | 'unknown';

export interface SecurityAccountItem {
  id: string;
  serviceName: string;
  category: SecurityCategoryType;
  identifier: string; // e.g., email or username (masked for display)
  mfaEnabled: boolean;
  mfaType?: 'authenticator' | 'sms' | 'hardware_key' | 'none';
  passwordAgeDays: number;
  isBreached: boolean;
  breachCount: number;
  status: AccountStatus;
  lastAuditedAt: string;
}

export interface SecurityAuditHistoryEntry {
  id: string;
  timestamp: string;
  actionTitle: string;
  scoreChange: number; // e.g. +10
  category: SecurityCategoryType;
}

export interface VaultState {
  totalAccounts: number;
  mfaCoveragePercentage: number;
  openRisks: SecurityRisk[];
  recommendations: SecurityRecommendation[];
  accounts: SecurityAccountItem[];
  auditHistory: SecurityAuditHistoryEntry[];
}
