import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { colors } from '../../theme/colors';
import { typography, spacing, radii } from '../../theme/spacing';
import { LeakTimelineEntry } from '../../types/leaks';
import { RiskBadge } from './Badge';

interface TimelineProps {
  entries: LeakTimelineEntry[];
}

export const Timeline: React.FC<TimelineProps> = ({ entries }) => {
  return (
    <View style={styles.container}>
      {entries.map((entry, entryIndex) => (
        <View key={entry.year} style={styles.yearSection}>
          <View style={styles.yearHeader}>
            <View style={styles.yearDot} />
            <Text style={styles.yearText}>{entry.year}</Text>
          </View>
          <View style={styles.incidentsList}>
            {entry.incidents.map((inc) => (
              <View key={inc.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.serviceName}>{inc.serviceName}</Text>
                  <RiskBadge severity={inc.severity} />
                </View>
                <Text style={styles.breachDate}>Date d’exposition: {inc.breachDate}</Text>
                <Text style={styles.description}>{inc.description}</Text>

                <View style={styles.tagsContainer}>
                  {inc.dataClasses.map((tag) => (
                    <View key={tag} style={styles.tagPill}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: spacing.sm,
  },
  yearSection: {
    borderLeftWidth: 2,
    borderLeftColor: colors.surfaceBorder,
    paddingLeft: spacing.md,
    marginBottom: spacing.lg,
  },
  yearHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -spacing.md - 5,
    marginBottom: spacing.sm,
  },
  yearDot: {
    width: 10,
    height: 10,
    borderRadius: radii.full,
    backgroundColor: colors.primary,
    marginRight: spacing.sm,
  },
  yearText: {
    ...typography.titleSmall,
    color: colors.primary,
  },
  incidentsList: {
    gap: spacing.sm,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderColor: colors.surfaceBorder,
    borderWidth: 1,
    padding: spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  serviceName: {
    ...typography.bodyLarge,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  breachDate: {
    ...typography.caption,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  description: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  tagPill: {
    backgroundColor: colors.surfaceElevated,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radii.sm,
  },
  tagText: {
    ...typography.caption,
    fontSize: 11,
    color: colors.textSecondary,
  },
});
