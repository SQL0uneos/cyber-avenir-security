import { ScamInputType, ScamAnalysis } from '../../types/scamhunt';

export interface ScamAnalyzerProvider {
  analyze(type: ScamInputType, content: string): Promise<ScamAnalysis>;
}
