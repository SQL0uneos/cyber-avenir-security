import { SecurityScore } from '../types/score';
import { VaultState } from '../types/vault';
import { securityScoreEngine } from '../core/score-engine/ScoreEngine';
import {
  MOCK_SECURITY_SIGNALS,
  MOCK_ACCOUNTS,
  MOCK_AUDIT_HISTORY,
} from '../mocks/vault.mock';

export class VaultService {
  public async getSecurityScore(): Promise<SecurityScore> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return securityScoreEngine.calculateScore(MOCK_SECURITY_SIGNALS);
  }

  public async getVaultState(): Promise<VaultState> {
    const scoreData = await this.getSecurityScore();
    const totalAccounts = MOCK_ACCOUNTS.length;
    const mfaSecureCount = MOCK_ACCOUNTS.filter((a) => a.mfaEnabled).length;
    const mfaCoveragePercentage = Math.round(
      (mfaSecureCount / Math.max(1, totalAccounts)) * 100
    );

    return {
      totalAccounts,
      mfaCoveragePercentage,
      openRisks: scoreData.topRisks,
      recommendations: scoreData.recommendations,
      accounts: MOCK_ACCOUNTS,
      auditHistory: MOCK_AUDIT_HISTORY,
    };
  }
}

export const vaultService = new VaultService();
