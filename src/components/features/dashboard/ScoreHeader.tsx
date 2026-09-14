import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { colors } from '../../../theme/colors';
import { typography, spacing, radii } from '../../../theme/spacing';
import { SecurityScore } from '../../../types/score';
import { ScoreRing } from '../../ui/ScoreRing';
import { ShieldCheck, AlertTriangle } from 'lucide-react-native';

interface ScoreHeaderProps {
  scoreData: SecurityScore;
}

export const ScoreHeader: React.FC<ScoreHeaderProps> = ({ scoreData }) => {
  const isGood = scoreData.score >= 70;

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.textColumn}>
          <Text style={styles.headerSubtitle}>COCKPIT SÉCURITÉ</Text>
          <Text style={styles.statusTitle}>{scoreData.statusLabel}</Text>
          <Text style={styles.summaryText}>{scoreData.summaryText}</Text>
        </View>
        <ScoreRing score={scoreData.score} level={scoreData.level} size={110} strokeWidth={9} />
      </View>

      <View style={styles.bannerRow}>
        <View style={styles.badgePill}>
          {isGood ? (
            <ShieldCheck size={14} color={colors.primary} />
          ) : (
            <AlertTriangle size={14} color={colors.high} />
          )}
          <Text style={styles.badgeText}>
            {scoreData.signalsCount} signaux analysés
          </Text>
        </View>

        <Text style={styles.updatedText}>
          Mis à jour à {new Date(scoreData.lastCalculatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.md,
  },
  textColumn: {
    flex: 1,
  },
  headerSubtitle: {
    ...typography.badge,
    color: colors.primary,
    marginBottom: 2,
  },
  statusTitle: {
    ...typography.titleSmall,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  summaryText: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
    fontSize: 13,
  },
  bannerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.surfaceBorder,
  },
  badgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  badgeText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  updatedText: {
    ...typography.caption,
    fontSize: 11,
    color: colors.textMuted,
  },
});
