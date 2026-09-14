import React from 'react';
import { StyleSheet, View, Text, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '../../src/components/ui/Screen';
import { Section } from '../../src/components/ui/Section';
import { Card } from '../../src/components/ui/Card';
import { Button } from '../../src/components/ui/Button';
import { useAuthStore } from '../../src/stores/useAuthStore';
import { useSettingsStore } from '../../src/stores/useSettingsStore';
import { colors } from '../../src/theme/colors';
import { typography, spacing, radii } from '../../src/theme/spacing';
import { User, Shield, Lock, Bell, Info, ChevronRight, LogOut } from 'lucide-react-native';

export default function SettingsScreen() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const { biometricsEnabled, toggleBiometrics } = useSettingsStore();

  return (
    <Screen scrollable>
      {/* Profile Info */}
      <Card elevated style={styles.profileCard}>
        <View style={styles.avatarCircle}>
          <User size={32} color={colors.primary} />
        </View>
        <View style={styles.profileDetails}>
          <Text style={styles.userName}>{user?.displayName || 'Utilisateur'}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
          <Text style={styles.memberSince}>Membre Cyber Avenir depuis {user?.memberSince}</Text>
        </View>
      </Card>

      {/* Settings Sections */}
      <Section title="Sécurité & Confidentialité">
        <Card onPress={() => router.push('/settings/privacy')} style={styles.menuRow}>
          <Shield size={20} color={colors.primary} />
          <View style={styles.menuTextGroup}>
            <Text style={styles.menuTitle}>Privacy Center & Consentements</Text>
            <Text style={styles.menuSubtitle}>Gérer la rétention et le traitement des données</Text>
          </View>
          <ChevronRight size={18} color={colors.textMuted} />
        </Card>

        <Card style={styles.switchRow}>
          <Lock size={20} color={colors.cyan} />
          <View style={styles.menuTextGroup}>
            <Text style={styles.menuTitle}>Déverrouillage Biométrique (FaceID / Fingerprint)</Text>
            <Text style={styles.menuSubtitle}>Protéger l’accès au cockpit</Text>
          </View>
          <Switch
            value={biometricsEnabled}
            onValueChange={toggleBiometrics}
            trackColor={{ false: colors.surfaceBorder, true: colors.primary }}
          />
        </Card>
      </Section>

      <Section title="À Propos du Produit">
        <Card style={styles.infoCard}>
          <Info size={20} color={colors.indigo} />
          <View style={styles.menuTextGroup}>
            <Text style={styles.menuTitle}>Cyber Avenir Security v1.0.0</Text>
            <Text style={styles.menuSubtitle}>
              Application mobile officielle éditée par l’association Cyber Avenir.
            </Text>
          </View>
        </Card>
      </Section>

      <Button
        title="Déconnexion"
        variant="danger"
        onPress={logout}
        icon={<LogOut size={18} color={colors.critical} />}
        style={{ marginTop: spacing.md }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginVertical: spacing.md,
  },
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.surfaceElevated,
    borderColor: colors.primary,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileDetails: {
    flex: 1,
  },
  userName: {
    ...typography.titleSmall,
    color: colors.textPrimary,
  },
  userEmail: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
  },
  memberSince: {
    ...typography.caption,
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.xs,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.xs,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  menuTextGroup: {
    flex: 1,
  },
  menuTitle: {
    ...typography.bodyMedium,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  menuSubtitle: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
});
