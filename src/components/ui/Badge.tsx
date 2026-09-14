import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme/colors';
import { typography, radii, spacing } from '../../theme/spacing';
import { RiskSeverity } from '../../types/common';

interface BadgeProps {
  label: string;
  color?: string;
  backgroundColor?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  color = colors.textPrimary,
  backgroundColor = colors.surfaceElevated,
}) => {
  return (
    <View style={[styles.badge, { backgroundColor }]}>
      <Text style={[styles.label, { color }]}>{label.toUpperCase()}</Text>
    </View>
  );
};

interface RiskBadgeProps {
  severity: RiskSeverity;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ severity }) => {
  let bg = colors.lowBg;
  let fg = colors.low;
  let textLabel = severity as string;

  switch (severity) {
    case 'critical':
      bg = colors.criticalBg;
      fg = colors.critical;
      textLabel = 'Critique';
      break;
    case 'high':
      bg = colors.highBg;
      fg = colors.high;
      textLabel = 'Élevé';
      break;
    case 'medium':
      bg = colors.mediumBg;
      fg = colors.medium;
      textLabel = 'Moyen';
      break;
    case 'low':
      bg = colors.lowBg;
      fg = colors.low;
      textLabel = 'Faible';
      break;
    case 'safe':
      bg = colors.primaryGlow;
      fg = colors.primary;
      textLabel = 'Sécurisé';
      break;
  }

  return <Badge label={textLabel} color={fg} backgroundColor={bg} />;
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radii.sm,
    alignSelf: 'flex-start',
  },
  label: {
    ...typography.badge,
  },
});
