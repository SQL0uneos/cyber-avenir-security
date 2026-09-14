export type ScanType = 'OSINT' | 'LEAK' | 'SCAM' | 'VAULT_AUDIT';

export type ScanStatus = 'idle' | 'pending' | 'in_progress' | 'completed' | 'failed';

export interface Scan {
  id: string;
  type: ScanType;
  target: string;
  status: ScanStatus;
  progress: number; // 0 - 100
  resultSummary?: string;
  resultId?: string;
  startedAt: string;
  completedAt?: string;
  error?: string;
}
