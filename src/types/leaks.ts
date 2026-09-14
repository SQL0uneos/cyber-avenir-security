import { RiskSeverity } from './common';

export interface BreachIncident {
  id: string;
  serviceName: string;
  domain: string;
  breachDate: string; // e.g. "2021-05-14"
  addedDate: string;
  pwnCount: number; // estimated affected users
  description: string;
  dataClasses: string[]; // e.g., ["Passwords", "Email addresses", "IP addresses"]
  isVerified: boolean;
  isFabricated: boolean;
  isSensitive: boolean;
  severity: RiskSeverity;
}

export interface LeakTimelineEntry {
  year: number;
  incidents: BreachIncident[];
}

export interface LeakSummary {
  identifier: string;
  numberOfBreaches: number;
  affectedServices: string[];
  exposedDataTypes: string[];
  recurrenceScore: number; // 0 - 100
  riskScore: number; // 0 - 100
  timeline: LeakTimelineEntry[];
  lastCheckedAt: string;
}
