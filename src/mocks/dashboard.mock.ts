import { Scan } from '../types/scan';

export const MOCK_RECENT_SCANS: Scan[] = [
  {
    id: 'scan-001',
    type: 'SCAM',
    target: 'https://secure-login-banque-verification.com',
    status: 'completed',
    progress: 100,
    resultSummary: 'Malicious - Risk Score 94/100',
    resultId: 'scam-analysis-101',
    startedAt: '2026-09-14T22:15:00Z',
    completedAt: '2026-09-14T22:15:02Z',
  },
  {
    id: 'scan-002',
    type: 'LEAK',
    target: 'alex.dev99@gmail.com',
    status: 'completed',
    progress: 100,
    resultSummary: '4 fuites d’identifiants détectées',
    startedAt: '2026-09-14T19:40:00Z',
    completedAt: '2026-09-14T19:40:04Z',
  },
  {
    id: 'scan-003',
    type: 'OSINT',
    target: 'alexdev99',
    status: 'completed',
    progress: 100,
    resultSummary: 'Identité numérique corrélée (4 nœuds)',
    startedAt: '2026-09-13T14:10:00Z',
    completedAt: '2026-09-13T14:10:03Z',
  },
];
