import {
  SecuritySignal,
  SecurityScore,
  SecurityCategoryScore,
  SecurityCategoryType,
  SecurityRisk,
  SecurityRecommendation,
} from '../../types/score';
import { StatusLevel } from '../../types/common';

export interface ScoreEngineConfig {
  baseScore: number; // default 100
  criticalDeduction: number; // weight multiplier for critical
  highDeduction: number;
  mediumDeduction: number;
  lowDeduction: number;
}

const DEFAULT_CONFIG: ScoreEngineConfig = {
  baseScore: 100,
  criticalDeduction: 28,
  highDeduction: 18,
  mediumDeduction: 10,
  lowDeduction: 4,
};

const CATEGORY_META: Record<
  SecurityCategoryType,
  { label: string; iconName: string; defaultWeight: number }
> = {
  accounts: { label: 'Comptes Critiques', iconName: 'UserCheck', defaultWeight: 20 },
  mfa: { label: 'Authentification 2FA/MFA', iconName: 'ShieldCheck', defaultWeight: 25 },
  passwords: { label: 'Politique Mots de Passe', iconName: 'KeyRound', defaultWeight: 15 },
  email_exposure: { label: 'Exposition Email', iconName: 'Mail', defaultWeight: 20 },
  devices: { label: 'Sécurité Appareils', iconName: 'Smartphone', defaultWeight: 10 },
  social_accounts: { label: 'Réseaux Sociaux', iconName: 'Share2', defaultWeight: 5 },
  recovery_methods: { label: 'Options de Récupération', iconName: 'LifeBuoy', defaultWeight: 5 },
};

export class SecurityScoreEngine {
  private config: ScoreEngineConfig;

  constructor(config?: Partial<ScoreEngineConfig>) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  public calculateScore(signals: SecuritySignal[]): SecurityScore {
    let totalDeductions = 0;

    // Track statistics per category
    const categoryStats: Record<
      SecurityCategoryType,
      { total: number; secure: number; risks: number; deduction: number }
    > = {
      accounts: { total: 4, secure: 3, risks: 1, deduction: 0 },
      mfa: { total: 5, secure: 4, risks: 1, deduction: 0 },
      passwords: { total: 6, secure: 5, risks: 1, deduction: 0 },
      email_exposure: { total: 3, secure: 2, risks: 1, deduction: 0 },
      devices: { total: 2, secure: 2, risks: 0, deduction: 0 },
      social_accounts: { total: 3, secure: 3, risks: 0, deduction: 0 },
      recovery_methods: { total: 2, secure: 2, risks: 0, deduction: 0 },
    };

    const risks: SecurityRisk[] = [];
    const recommendations: SecurityRecommendation[] = [];

    for (const signal of signals) {
      const deduction = Math.round(signal.weight * signal.confidence);
      totalDeductions += deduction;

      if (categoryStats[signal.category]) {
        categoryStats[signal.category].risks += 1;
        categoryStats[signal.category].deduction += deduction;
      }

      // Convert signal into Risk representation
      risks.push({
        id: signal.id,
        category: signal.category,
        severity: signal.severity,
        title: signal.title,
        description: signal.description,
        affectedTarget: signal.source,
        remediationAction: `Activer la protection pour ${signal.title}`,
        dateDetected: signal.timestamp,
        isResolved: false,
      });

      // Generate actionable recommendation
      recommendations.push({
        id: `rec-${signal.id}`,
        riskId: signal.id,
        category: signal.category,
        title: `Corriger: ${signal.title}`,
        summary: signal.description,
        impactScoreBonus: Math.min(25, Math.max(5, deduction)),
        priority:
          signal.severity === 'critical'
            ? 'urgent'
            : signal.severity === 'high'
            ? 'important'
            : 'suggested',
        estimatedMinutes: signal.severity === 'critical' ? 3 : 5,
      });
    }

    const calculatedScore = Math.max(0, Math.min(100, this.config.baseScore - totalDeductions));

    let level: StatusLevel = 'optimal';
    let statusLabel = 'Sécurité Optimale';
    let summaryText = 'Votre posture de sécurité est exemplaire. Continuez ainsi.';

    if (calculatedScore < 40) {
      level = 'critical';
      statusLabel = 'Niveau de Risque Critique';
      summaryText = 'Vulnerabilités majeures détectées. Action immédiate recommandée.';
    } else if (calculatedScore < 70) {
      level = 'vulnerable';
      statusLabel = 'Niveau Vulnérable';
      summaryText = 'Plusieurs risques ouverts exposent votre identité numérique.';
    } else if (calculatedScore < 85) {
      level = 'good';
      statusLabel = 'Bon Niveau Général';
      summaryText = 'Bonne protection générale, des améliorations sont conseillées.';
    }

    // Build category scores breakdown
    const categories: SecurityCategoryScore[] = Object.entries(CATEGORY_META).map(
      ([catKey, meta]) => {
        const key = catKey as SecurityCategoryType;
        const stats = categoryStats[key];
        const catScore = Math.max(0, 100 - stats.deduction * 2);
        return {
          category: key,
          label: meta.label,
          score: catScore,
          totalItems: stats.total,
          secureItems: Math.max(0, stats.total - stats.risks),
          risksCount: stats.risks,
          iconName: meta.iconName,
        };
      }
    );

    return {
      score: calculatedScore,
      level,
      statusLabel,
      summaryText,
      categories,
      topRisks: risks.sort((a, b) => (a.severity === 'critical' ? -1 : 1)),
      recommendations: recommendations.sort((a, b) =>
        a.priority === 'urgent' ? -1 : 1
      ),
      signalsCount: signals.length,
      lastCalculatedAt: new Date().toISOString(),
    };
  }
}

export const securityScoreEngine = new SecurityScoreEngine();
