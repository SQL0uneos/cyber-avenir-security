import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Screen } from '../../src/components/ui/Screen';
import { Section } from '../../src/components/ui/Section';
import { Card } from '../../src/components/ui/Card';
import { RiskBadge } from '../../src/components/ui/Badge';
import { ProgressBar } from '../../src/components/ui/ProgressBar';
import { LoadingState } from '../../src/components/ui/LoadingState';
import { ErrorState } from '../../src/components/ui/ErrorState';
import { useVaultState } from '../../src/hooks/useVault';
import { colors } from '../../src/theme/colors';
import { typography, spacing, radii } from '../../src/theme/spacing';
import { ShieldCheck, ShieldAlert, KeyRound, Smartphone, UserCheck, AlertCircle } from 'lucide-react-native';

export default function VaultScreen() {
  const { data: vault, isLoading, isError, refetch } = useVaultState();

  if (isLoading) return <Screen><LoadingState message="Chargement du diagnostic CyberVault..." /></Screen>;
  if (isError || !vault)
    return <Screen><ErrorState message="Impossible de charger CyberVault" onRetry={refetch} /></Screen>;

  return (
    <Screen scrollable>
      {/* Header Diagnostic Summary */}
      <Card elevated style={styles.summaryCard}>
        <View style={styles.summaryHeader}>
          <ShieldCheck size={24} color={colors.primary} />
          <View style={styles.summaryTitles}>
            <Text style={styles.summaryTitle}>Centre de Pilotage & Diagnostic</Text>
            <Text style={styles.summarySubtitle}>
              {vault.totalAccounts} éléments sous contrôle actif
            </Text>
          </View>
        </View>

        <View style={styles.mfaBarSection}>
          <View style={styles.mfaBarHeader}>
            <Text style={styles.mfaLabel}>Couverture MFA (Double Authentification)</Text>
            <Text style={styles.mfaPercent}>{vault.mfaCoveragePercentage}%</Text>
          </View>
          <ProgressBar progress={vault.mfaCoveragePercentage} color={colors.primary} />
        </View>
      </Card>

      {/* Account Inventory */}
      <Section title="Inventaire des Éléments & Comptes">
        {vault.accounts.map((acc) => (
          <Card key={acc.id} style={styles.accountCard}>
            <View style={styles.accHeader}>
              <View style={styles.accTitleRow}>
                <UserCheck size={18} color={colors.primary} />
                <Text style={styles.serviceName}>{acc.serviceName}</Text>
              </View>
              <RiskBadge
                severity={
                  acc.status === 'secure'
                    ? 'safe'
                    : acc.status === 'warning'
                    ? 'high'
                    : 'critical'
                }
              />
            </View>

            <Text style={styles.identifier}>Identifiant : {acc.identifier}</Text>

            <View style={styles.accDetailsGrid}>
              <View style={styles.accDetailItem}>
                <Text style={styles.detailLabel}>MFA</Text>
                <Text
                  style={[
                    styles.detailVal,
                    { color: acc.mfaEnabled ? colors.primary : colors.critical },
                  ]}
                >
                  {acc.mfaEnabled ? `Actif (${acc.mfaType})` : 'Inactif ⚠️'}
                </Text>
              </View>

              <View style={styles.accDetailItem}>
                <Text style={styles.detailLabel}>Age Mot de Passe</Text>
                <Text style={styles.detailVal}>{acc.passwordAgeDays} jours</Text>
              </View>

              <View style={styles.accDetailItem}>
                <Text style={styles.detailLabel}>Exposition Fuites</Text>
                <Text
                  style={[
                    styles.detailVal,
                    { color: acc.isBreached ? colors.critical : colors.textSecondary },
                  ]}
                >
                  {acc.isBreached ? `${acc.breachCount} fuite(s)` : 'Aucune'}
                </Text>
              </View>
            </View>
          </Card>
        ))}
      </Section>

      {/* Security Audit History */}
      <Section title="Historique des Améliorations">
        {vault.auditHistory.map((hist) => (
          <View key={hist.id} style={styles.histRow}>
            <View style={styles.histDot} />
            <View style={styles.histInfo}>
              <Text style={styles.histTitle}>{hist.actionTitle}</Text>
              <Text style={styles.histDate}>
                {new Date(hist.timestamp).toLocaleDateString()}
              </Text>
            </View>
            <Text style={styles.scorePlus}>+{hist.scoreChange} pts</Text>
          </View>
        ))}
      </Section>
    </Screen>
  );
}

const styles = StyleSheet.create({
  summaryCard: {
    marginVertical: spacing.md,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  summaryTitles: {
    flex: 1,
  },
  summaryTitle: {
    ...typography.titleSmall,
    color: colors.textPrimary,
  },
  summarySubtitle: {
    ...typography.caption,
    color: colors.textMuted,
  },
  mfaBarSection: {
    marginTop: spacing.xs,
  },
  mfaBarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  mfaLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  mfaPercent: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '700',
  },
  accountCard: {
    marginBottom: spacing.sm,
  },
  accHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  accTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  serviceName: {
    ...typography.bodyLarge,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  identifier: {
    ...typography.caption,
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },
  accDetailsGrid: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceElevated,
    borderRadius: radii.sm,
    padding: spacing.sm,
    justifyContent: 'space-between',
  },
  accDetailItem: {
    flex: 1,
  },
  detailLabel: {
    ...typography.caption,
    fontSize: 10,
    color: colors.textMuted,
    textTransform: 'uppercase',
  },
  detailVal: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.textPrimary,
    marginTop: 2,
  },
  histRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceBorder,
  },
  histDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginRight: spacing.sm,
  },
  histInfo: {
    flex: 1,
  },
  histTitle: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
  },
  histDate: {
    ...typography.caption,
    fontSize: 11,
    color: colors.textMuted,
  },
  scorePlus: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.primary,
  },
});
