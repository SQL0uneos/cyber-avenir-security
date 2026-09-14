import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Screen } from '../../src/components/ui/Screen';
import { Section } from '../../src/components/ui/Section';
import { Card } from '../../src/components/ui/Card';
import { Input } from '../../src/components/ui/Input';
import { Button } from '../../src/components/ui/Button';
import { Timeline } from '../../src/components/ui/Timeline';
import { LoadingState } from '../../src/components/ui/LoadingState';
import { PrivacyNotice } from '../../src/components/ui/PrivacyNotice';
import { useLeakCheck } from '../../src/hooks/useLeakCheck';
import { LeakSummary } from '../../src/types/leaks';
import { colors } from '../../src/theme/colors';
import { typography, spacing, radii } from '../../src/theme/spacing';
import { Dna, Mail, AlertTriangle, ShieldCheck } from 'lucide-react-native';

export default function LeaksScreen() {
  const [identifier, setIdentifier] = useState('alex.dev99@gmail.com');
  const [leakSummary, setLeakSummary] = useState<LeakSummary | null>(null);

  const { mutate: runCheck, isPending } = useLeakCheck();

  const handleCheck = () => {
    if (!identifier.trim()) return;
    runCheck(identifier.trim(), {
      onSuccess: (data) => setLeakSummary(data),
    });
  };

  return (
    <Screen scrollable>
      <View style={styles.header}>
        <Dna size={28} color={colors.cyan} />
        <View style={styles.headerText}>
          <Text style={styles.title}>Leak DNA Scanner</Text>
          <Text style={styles.subtitle}>
            Vérifiez l’exposition de vos identifiants dans les fuites de données
          </Text>
        </View>
      </View>

      <Card style={styles.inputCard}>
        <Input
          label="Adresse Email ou Nom d'utilisateur :"
          placeholder="ex: vider.email@domaine.fr"
          value={identifier}
          onChangeText={setIdentifier}
          leftIcon={<Mail size={18} color={colors.textMuted} />}
        />

        <PrivacyNotice message="Aucune requête brute n'est transmise non chiffrée. Seuls les hachages sont vérifiés." />

        <Button
          title="Vérifier l’exposition Leak DNA"
          onPress={handleCheck}
          loading={isPending}
          icon={<Dna size={18} color={colors.background} />}
        />
      </Card>

      {isPending && <LoadingState message="Recherche sur la base Leak DNA..." />}

      {leakSummary && !isPending && (
        <>
          {/* Summary KPIs */}
          <Section title="Synthèse de l’Exposition">
            <View style={styles.kpiGrid}>
              <View style={styles.kpiBox}>
                <Text style={styles.kpiVal}>{leakSummary.numberOfBreaches}</Text>
                <Text style={styles.kpiLabel}>Fuites Détectées</Text>
              </View>

              <View style={styles.kpiBox}>
                <Text style={[styles.kpiVal, { color: colors.high }]}>
                  {leakSummary.recurrenceScore}/100
                </Text>
                <Text style={styles.kpiLabel}>Score Récidive</Text>
              </View>

              <View style={styles.kpiBox}>
                <Text style={[styles.kpiVal, { color: colors.critical }]}>
                  {leakSummary.riskScore}/100
                </Text>
                <Text style={styles.kpiLabel}>Niveau de Risque</Text>
              </View>
            </View>

            {/* Compromised Data Types */}
            <Card style={styles.dataTypesCard}>
              <Text style={styles.dataTypesTitle}>Catégories de données exposées :</Text>
              <View style={styles.pillsRow}>
                {leakSummary.exposedDataTypes.map((dt) => (
                  <View key={dt} style={styles.pill}>
                    <AlertTriangle size={12} color={colors.critical} />
                    <Text style={styles.pillText}>{dt}</Text>
                  </View>
                ))}
              </View>
            </Card>
          </Section>

          {/* Chronological Timeline */}
          <Section title="Timeline Chronologique des Incidents">
            <Timeline entries={leakSummary.timeline} />
          </Section>
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginVertical: spacing.md,
  },
  headerText: {
    flex: 1,
  },
  title: {
    ...typography.titleMedium,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.caption,
    color: colors.textMuted,
  },
  inputCard: {
    marginBottom: spacing.md,
  },
  kpiGrid: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  kpiBox: {
    flex: 1,
    backgroundColor: colors.surfaceElevated,
    borderRadius: radii.md,
    padding: spacing.md,
    alignItems: 'center',
    borderColor: colors.surfaceBorder,
    borderWidth: 1,
  },
  kpiVal: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 2,
  },
  kpiLabel: {
    ...typography.caption,
    fontSize: 11,
    color: colors.textMuted,
    textAlign: 'center',
  },
  dataTypesCard: {
    marginTop: spacing.xs,
  },
  dataTypesTitle: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  pillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.criticalBg,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radii.sm,
  },
  pillText: {
    ...typography.caption,
    color: colors.critical,
    fontWeight: '600',
  },
});
