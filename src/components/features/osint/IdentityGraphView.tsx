import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { colors } from '../../../theme/colors';
import { typography, spacing, radii } from '../../../theme/spacing';
import { DigitalIdentity } from '../../../types/osint';
import { Network, UserCheck, Mail, Globe, Share2 } from 'lucide-react-native';

interface IdentityGraphViewProps {
  identity: DigitalIdentity;
}

export const IdentityGraphView: React.FC<IdentityGraphViewProps> = ({
  identity,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Network size={20} color={colors.primary} />
        <Text style={styles.title}>Graphe d’Identité Corrélée (OSINT)</Text>
      </View>

      <Text style={styles.targetLabel}>
        Cible analysée : <Text style={styles.targetVal}>{identity.primaryIdentifier}</Text>
      </Text>

      <View style={styles.grid}>
        <View style={styles.nodeBox}>
          <UserCheck size={16} color={colors.cyan} />
          <Text style={styles.nodeCount}>{identity.usernames.length}</Text>
          <Text style={styles.nodeTitle}>Pseudos</Text>
        </View>

        <View style={styles.nodeBox}>
          <Mail size={16} color={colors.high} />
          <Text style={styles.nodeCount}>{identity.emails.length}</Text>
          <Text style={styles.nodeTitle}>Emails</Text>
        </View>

        <View style={styles.nodeBox}>
          <Share2 size={16} color={colors.indigo} />
          <Text style={styles.nodeCount}>{identity.platforms.length}</Text>
          <Text style={styles.nodeTitle}>Plateformes</Text>
        </View>

        <View style={styles.nodeBox}>
          <Globe size={16} color={colors.primary} />
          <Text style={styles.nodeCount}>{identity.domains.length}</Text>
          <Text style={styles.nodeTitle}>Domaines</Text>
        </View>
      </View>

      <View style={styles.relationsList}>
        <Text style={styles.relationsTitle}>Relations détectées ({identity.relations.length}) :</Text>
        {identity.relations.map((rel) => (
          <View key={rel.id} style={styles.relationRow}>
            <Text style={styles.relationText}>
              <Text style={styles.bold}>{rel.sourceEntity}</Text> → [{rel.relationType}] →{' '}
              <Text style={styles.bold}>{rel.targetEntity}</Text>
            </Text>
            <Text style={styles.confidenceText}>
              {Math.round(rel.confidence * 100)}% conf.
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.surfaceBorder,
    borderWidth: 1,
    borderRadius: radii.lg,
    padding: spacing.md,
    marginVertical: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  title: {
    ...typography.titleSmall,
    color: colors.textPrimary,
  },
  targetLabel: {
    ...typography.caption,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  targetVal: {
    color: colors.primary,
    fontWeight: '700',
  },
  grid: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  nodeBox: {
    flex: 1,
    backgroundColor: colors.surfaceElevated,
    borderRadius: radii.md,
    padding: spacing.sm,
    alignItems: 'center',
  },
  nodeCount: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
    marginVertical: 2,
  },
  nodeTitle: {
    ...typography.caption,
    fontSize: 11,
    color: colors.textMuted,
  },
  relationsList: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: radii.md,
    padding: spacing.sm,
  },
  relationsTitle: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  relationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceBorder,
  },
  relationText: {
    ...typography.caption,
    color: colors.textSecondary,
    flex: 1,
  },
  bold: {
    color: colors.textPrimary,
    fontWeight: '600',
  },
  confidenceText: {
    ...typography.caption,
    fontSize: 11,
    color: colors.primary,
  },
});
