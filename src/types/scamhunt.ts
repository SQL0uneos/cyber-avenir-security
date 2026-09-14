export type ScamInputType = 'url' | 'text' | 'image';

export type ScamVerdict = 'Malicious' | 'Suspicious' | 'Safe' | 'Unknown';

export interface ScamIndicator {
  id: string;
  code: string;
  name: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'info';
}

export interface ScamAnalysis {
  id: string;
  inputType: ScamInputType;
  submittedContent: string;
  verdict: ScamVerdict;
  verdictLabel: string; // e.g. "Probable phishing", "Suspicious", "No strong indicators"
  riskScore: number; // 0 - 100
  indicators: ScamIndicator[];
  reassurances: string[];
  recommendations: string[];
  analyzedAt: string;
}
