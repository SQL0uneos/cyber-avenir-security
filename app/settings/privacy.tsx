import React from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { Screen } from '../../src/components/ui/Screen';
import { Section } from '../../src/components/ui/Section';
import { Card } from '../../src/components/ui/Card';
import { Button } from '../../src/components/ui/Button';
import { PrivacyNotice } from '../../src/components/ui/PrivacyNotice';
import { useSettingsStore } from '../../src/stores/useSettingsStore';
import { useScanStore } from '../../src/stores/useScanStore';
import { colors } from '../../src/theme/colors';
import { typography, spacing, radii } from '../../src/theme/spacing';
import { Shield, Trash2, CheckCircle2, Lock } from 'lucide-react-native';

export default function PrivacyCenterScreen() {
  const { privacyConsent, updateConsent } = useSettingsStore();
  const clearScanHistory = useScanStore((s) => s.clearHistory);

  const handlePurgeData = () => {
    clearScanHistory();
    Alert.alert(
      'Données purgées',
      'L’historique local des analyses a été supprimé définitivement.'
    );
  };

  return (
    <Screen scrollable>
      <View style={styles.header}>
        <Shield size={32} color={colors.primary} />
        <View style={styles.headerText}>
          <Text style={styles.title}>Privacy Center & Transparence</Text>
          <Text style={styles.subtitle}>
            Transparence totale sur vos données personnelles et vos choix
          </Text>
        </View>
      </View>

      <PrivacyNotice
        message="Le produit Cyber Avenir Security ne vend ni ne loue vos données."
        providerInfo="Tous les scans utilisent des abstractions anonymisées sans stockage nominatif."
      />

      <Section title="Principes de Confidentialité">
        <Card style={styles.principleCard}>
          <Lock size={18} color={colors.cyan} />
          <View style={styles.principleTextGroup}>
            <Text style={styles.principleTitle}>Zéro Stockage de Mots de Passe en Clair</Text>
            <Text style={styles.principleDesc}>
              L'application ne demande et n'enregistre jamais vos mots de passe. Seules des données déclaratives et des hachages sécurisés sont évalués.
            </Text>
          </View>
        </Card>

        <Card style={styles.principleCard}>
          <CheckCircle2 size={18} color={colors.primary} />
          <View style={styles.principleTextGroup}>
            <Text style={styles.principleTitle}>Fournisseurs Tierces Isoles</Text>
            <Text style={styles.principleDesc}>
              Les requêtes vers les bases OSINT, HaveIBeenPwned ou ThreatIntel transitent uniquement par nos adapters normalisés sans révéler votre identité globale.
            </Text>
          </View>
        </Card>
      </Section>

      <Section title="Gestion & Suppression des Données">
        <Card style={styles.actionCard}>
          <Text style={styles.actionTitle}>Effacer l’historique local des scans</Text>
          <Text style={styles.actionDesc}>
            Supprime définitivement tous les résultats de scans OSINT, Leak DNA et ScamHunt mémorisés sur l’appareil.
          </Text>
          <Button
            title="Purger mes données locales"
            variant="danger"
            size="sm"
            onPress={handlePurgeData}
            icon={<Trash2 size={16} color={colors.critical} />}
            style={{ marginTop: spacing.sm }}
          />
        </Card>
      </Section>
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
  principleCard: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  principleTextGroup: {
    flex: 1,
  },
  principleTitle: {
    ...typography.bodyMedium,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  principleDesc: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  actionCard: {
    marginBottom: spacing.md,
  },
  actionTitle: {
    ...typography.bodyMedium,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  actionDesc: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
});
