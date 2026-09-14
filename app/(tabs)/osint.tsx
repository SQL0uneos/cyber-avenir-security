import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Screen } from '../../src/components/ui/Screen';
import { Section } from '../../src/components/ui/Section';
import { Card } from '../../src/components/ui/Card';
import { Input } from '../../src/components/ui/Input';
import { Button } from '../../src/components/ui/Button';
import { Badge } from '../../src/components/ui/Badge';
import { LoadingState } from '../../src/components/ui/LoadingState';
import { PrivacyNotice } from '../../src/components/ui/PrivacyNotice';
import { IdentityGraphView } from '../../src/components/features/osint/IdentityGraphView';
import { useOsintScan } from '../../src/hooks/useOsintScan';
import { OsintTargetType, OsintSearchResult } from '../../src/types/osint';
import { colors } from '../../src/theme/colors';
import { typography, spacing, radii } from '../../src/theme/spacing';
import { Radar, User, Mail, Globe, Search, ExternalLink } from 'lucide-react-native';

const TARGET_TYPES: { type: OsintTargetType; label: string; icon: any }[] = [
  { type: 'username', label: 'Pseudo', icon: User },
  { type: 'email', label: 'Email', icon: Mail },
  { type: 'domain', label: 'Domaine', icon: Globe },
];

export default function OsintScreen() {
  const [targetType, setTargetType] = useState<OsintTargetType>('username');
  const [inputValue, setInputValue] = useState('alexdev99');
  const [searchResult, setSearchResult] = useState<OsintSearchResult | null>(null);

  const { mutate: runScan, isPending, isError } = useOsintScan();

  const handleSearch = () => {
    if (!inputValue.trim()) return;
    runScan(
      { targetType, targetValue: inputValue.trim() },
      {
        onSuccess: (res) => setSearchResult(res),
      }
    );
  };

  return (
    <Screen scrollable>
      <View style={styles.header}>
        <Radar size={28} color={colors.indigo} />
        <View style={styles.headerText}>
          <Text style={styles.title}>OSINT Identity Radar</Text>
          <Text style={styles.subtitle}>Évaluer votre exposition publique globale</Text>
        </View>
      </View>

      {/* Target Selector */}
      <Card style={styles.selectorCard}>
        <Text style={styles.selectorLabel}>Élément à analyser :</Text>
        <View style={styles.targetTypeRow}>
          {TARGET_TYPES.map((t) => {
            const Icon = t.icon;
            const active = targetType === t.type;
            return (
              <TouchableOpacity
                key={t.type}
                style={[styles.typePill, active && styles.typePillActive]}
                onPress={() => setTargetType(t.type)}
              >
                <Icon size={16} color={active ? colors.background : colors.textSecondary} />
                <Text style={[styles.typeText, active && styles.typeTextActive]}>
                  {t.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Input
          placeholder={`Saisissez un ${targetType}...`}
          value={inputValue}
          onChangeText={setInputValue}
          leftIcon={<Search size={18} color={colors.textMuted} />}
          style={{ marginTop: spacing.sm }}
        />

        <PrivacyNotice message="Seules des sources OSINT publiques enregistrées sont consultées." />

        <Button
          title="Lancer l’analyse OSINT"
          onPress={handleSearch}
          loading={isPending}
          icon={<Radar size={18} color={colors.background} />}
        />
      </Card>

      {isPending && (
        <LoadingState message="Recherche sur les registres et corrélation de l’identité..." />
      )}

      {/* Results View */}
      {searchResult && !isPending && (
        <>
          {/* Identity Correlation Graph */}
          <IdentityGraphView identity={searchResult.digitalIdentity} />

          {/* Normalized Results List */}
          <Section
            title="Résultats OSINT Normalisés"
            subtitle={`${searchResult.totalFound} correspondance(s) en ${searchResult.durationMs}ms`}
          >
            {searchResult.results.map((res) => (
              <Card key={res.id} style={styles.resCard}>
                <View style={styles.resHeader}>
                  <Text style={styles.resProvider}>{res.provider}</Text>
                  <Badge
                    label={`${Math.round(res.confidence * 100)}% Confiance`}
                    color={colors.cyan}
                    backgroundColor={colors.surfaceElevated}
                  />
                </View>
                <Text style={styles.resTitle}>{res.title}</Text>
                {res.url && (
                  <View style={styles.urlRow}>
                    <ExternalLink size={12} color={colors.primary} />
                    <Text style={styles.urlText} numberOfLines={1}>
                      {res.url}
                    </Text>
                  </View>
                )}
              </Card>
            ))}
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
  selectorCard: {
    marginBottom: spacing.md,
  },
  selectorLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    fontWeight: '600',
  },
  targetTypeRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  typePill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: colors.surfaceElevated,
    paddingVertical: spacing.xs,
    borderRadius: radii.md,
  },
  typePillActive: {
    backgroundColor: colors.primary,
  },
  typeText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  typeTextActive: {
    color: colors.background,
    fontWeight: '700',
  },
  resCard: {
    marginBottom: spacing.xs,
  },
  resHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  resProvider: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.textMuted,
  },
  resTitle: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  urlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: spacing.xs,
  },
  urlText: {
    ...typography.caption,
    fontSize: 11,
    color: colors.primary,
  },
});
