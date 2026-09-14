import { ScamAnalyzerProvider } from './ScamAnalyzerProvider';
import { ScamInputType, ScamAnalysis } from '../../types/scamhunt';
import { MOCK_SCAM_ANALYSES } from '../../mocks/scamhunt.mock';

export class MockScamAnalyzerProvider implements ScamAnalyzerProvider {
  public async analyze(type: ScamInputType, content: string): Promise<ScamAnalysis> {
    await new Promise((resolve) => setTimeout(resolve, 750));

    const lower = content.toLowerCase();
    if (lower.includes('banque') || lower.includes('login') || lower.includes('update')) {
      return {
        ...MOCK_SCAM_ANALYSES.malicious_url,
        inputType: type,
        submittedContent: content,
        analyzedAt: new Date().toISOString(),
      };
    }

    if (lower.includes('colis') || lower.includes('chronopost') || lower.includes('urgent')) {
      return {
        ...MOCK_SCAM_ANALYSES.suspicious_text,
        inputType: type,
        submittedContent: content,
        analyzedAt: new Date().toISOString(),
      };
    }

    return {
      ...MOCK_SCAM_ANALYSES.safe_sample,
      inputType: type,
      submittedContent: content,
      analyzedAt: new Date().toISOString(),
    };
  }
}
