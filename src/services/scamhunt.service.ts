import { ScamAnalyzerProvider } from '../providers/scam/ScamAnalyzerProvider';
import { MockScamAnalyzerProvider } from '../providers/scam/MockScamAnalyzerProvider';
import { ScamInputType, ScamAnalysis } from '../types/scamhunt';

export class ScamHuntService {
  constructor(
    private provider: ScamAnalyzerProvider = new MockScamAnalyzerProvider()
  ) {}

  public async analyze(
    type: ScamInputType,
    content: string
  ): Promise<ScamAnalysis> {
    return this.provider.analyze(type, content);
  }
}

export const scamHuntService = new ScamHuntService();
