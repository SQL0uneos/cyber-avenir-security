import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '../../src/components/ui/Screen';
import { Section } from '../../src/components/ui/Section';
import { Card } from '../../src/components/ui/Card';
import { Button } from '../../src/components/ui/Button';
import { RiskBadge } from '../../src/components/ui/Badge';
import { LoadingState } from '../../src/components/ui/LoadingState';
import { ErrorState } from '../../src/components/ui/ErrorState';
import { ScoreHeader } from '../../src/components/features/dashboard/ScoreHeader';
import { useSecurityScore } from '../../src/hooks/useSecurityScore';
import { useScanStore } from '../../src/stores/useScanStore';
import { colors } from '../../src/theme/colors';
import { typography, spacing, radii } from '../../src/theme/spacing';
import { Radar, Dna, SearchCheck, ArrowRight, ShieldAlert } from 'lucide-react-native';

export default function HomeScreen() {
  const router = useRouter();
  const { data: scoreData, isLoading, isError, refetch } = useSecurityScore();
  const recentScans = useScanStore((s) => s.scans);

  if (isLoading) return <Screen><LoadingState message="Évaluation du cockpit de sécurité..." /></Screen>;
  if (isError || !scoreData)
    return <Screen><ErrorState message="Impossible de charger le Security Score" onRetry={refetch} /></Screen>;

  return (
    <Screen scrollable>
      {/* Primary Question */}
      <View style={styles.questionBanner}>
        <Text style={styles.questionTitle}>Comment va ma sécurité numérique ?</Text>
        <Text style={styles.questionSubtitle}>Cockpit personnel en temps réel par Cyber Avenir</Text>
      </View>

      {/* Global Score Component */}
      <ScoreHeader scoreData={scoreData} />

      {/* Quick Launch Scans Grid */}
      <Section title="Analyses Rapides">
        <View style={styles.quickGrid}>
          <Card
            style={styles.quickCard}
            onPress={() => router.push('/scamhunt')}
          >
            <SearchCheck size={22} color={colors.primary} />
            <Text style={styles.quickTitle}>ScamHunt</Text>
            <Text style={styles.quickDesc}>Détecter un phishing</Text>
          </Card>

          <Card
            style={styles.quickCard}
            onPress={() => router.push('/leaks')}
          >
            <Dna size={22} color={colors.cyan} />
            <Text style={styles.quickTitle}>Leak DNA</Text>
            <Text style={styles.quickDesc}>Vérifier les fuites</Text>
          </Card>

          <Card
            style={styles.quickCard}
            onPress={() => router.push('/osint')}
          >
            <Radar size={22} color={colors.indigo} />
            <Text style={styles.quickTitle}>OSINT Radar</Text>
            <Text style={styles.quickDesc}>Exposition publique</Text>
          </Card>
        </View>
      </Section>

      {/* Top Open Risks */}
      <Section
        title="Risques Prioritaires"
        subtitle={`${scoreData.topRisks.length} vulnérabilité(s) ouverte(s)`}
        actionText="Voir tout dans Vault"
        onActionPress={() => router.push('/vault')}
      >
        {scoreData.topRisks.map((risk) => (
          <Card key={risk.id} onPress={() => router.push('/vault')}>
            <View style={styles.riskHeader}>
              <Text style={styles.riskTitle}>{risk.title}</Text>
              <RiskBadge severity={risk.severity} />
            </View>
            <Text style={styles.riskDesc}>{risk.description}</Text>
            <View style={styles.riskFooter}>
              <Text style={styles.targetText}>Source: {risk.affectedTarget}</Text>
              <ArrowRight size={14} color={colors.primary} />
            </View>
          </Card>
        ))}
      </Section>

      {/* Recommended Actions */}
      <Section title="Actions Recommandées">
        {scoreData.recommendations.map((rec) => (
          <Card key={rec.id} elevated style={styles.recCard}>
            <View style={styles.recLeft}>
              <Text style={styles.recTitle}>{rec.title}</Text>
              <Text style={styles.recDesc}>{rec.summary}</Text>
              <Text style={styles.recTime}>Est. {rec.estimatedMinutes} min</Text>
            </View>
            <View style={styles.recRight}>
              <Text style={styles.bonusBadge}>+{rec.impactScoreBonus} pts</Text>
              <Button
                title="Corriger"
                size="sm"
                onPress={() => router.push('/vault')}
              />
            </View>
          </Card>
        ))}
      </Section>

      {/* Recent Scans Activity */}
      <Section title="Dernières Analyses (Scans)">
        {recentScans.slice(0, 3).map((scan) => (
          <View key={scan.id} style={styles.scanRow}>
            <View style={styles.scanBadge}>
              <ShieldAlert size={16} color={colors.primary} />
            </View>
            <View style={styles.scanInfo}>
              <Text style={styles.scanType}>Scan {scan.type}</Text>
              <Text style={styles.scanTarget} numberOfLines={1}>
                {scan.target}
              </Text>
            </View>
            <Text style={styles.scanSummary}>{scan.resultSummary}</Text>
          </View>
        ))}
      </Section>
    </Screen>
  );
}

const styles = StyleSheet.create({
  questionBanner: {
    marginVertical: spacing.md,
  },
  questionTitle: {
    ...typography.titleMedium,
    color: colors.textPrimary,
  },
  questionSubtitle: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
  quickGrid: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  quickCard: {
    flex: 1,
    padding: spacing.sm,
    alignItems: 'center',
  },
  quickTitle: {
    ...typography.bodyMedium,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: spacing.xs,
  },
  quickDesc: {
    ...typography.caption,
    fontSize: 11,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 2,
  },
  riskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  riskTitle: {
    ...typography.bodyLarge,
    fontWeight: '700',
    color: colors.textPrimary,
    flex: 1,
    marginRight: spacing.sm,
  },
  riskDesc: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  riskFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  targetText: {
    ...typography.caption,
    color: colors.textMuted,
  },
  recCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recLeft: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  recTitle: {
    ...typography.bodyMedium,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  recDesc: {
    ...typography.caption,
    color: colors.textSecondary,
    marginVertical: 2,
  },
  recTime: {
    ...typography.caption,
    fontSize: 11,
    color: colors.textMuted,
  },
  recRight: {
    alignItems: 'flex-end',
    gap: spacing.xs,
  },
  bonusBadge: {
    ...typography.badge,
    color: colors.primary,
    backgroundColor: colors.primaryGlow,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: radii.sm,
  },
  scanRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.surfaceBorder,
    borderWidth: 1,
    borderRadius: radii.md,
    padding: spacing.sm,
    marginBottom: spacing.xs,
  },
  scanBadge: {
    width: 32,
    height: 32,
    borderRadius: radii.sm,
    backgroundColor: colors.surfaceElevated,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  scanInfo: {
    flex: 1,
  },
  scanType: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  scanTarget: {
    ...typography.caption,
    color: colors.textMuted,
    fontSize: 11,
  },
  scanSummary: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
  },
});
