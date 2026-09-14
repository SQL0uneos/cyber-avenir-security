import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { colors } from '../../theme/colors';
import { typography, spacing, radii } from '../../theme/spacing';
import { Shield, Info } from 'lucide-react-native';

interface PrivacyNoticeProps {
  message?: string;
  providerInfo?: string;
}

export const PrivacyNotice: React.FC<PrivacyNoticeProps> = ({
  message = 'Vos données saisies sont chiffrées localement et analysées de manière anonyme.',
  providerInfo = 'Aucune donnée privée ni mot de passe ne sont stockés en clair.',
}) => {
  return (
    <View style={styles.container}>
      <Shield size={16} color={colors.primary} style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>Engagement Confidentialité Cyber Avenir</Text>
        <Text style={styles.message}>{message}</Text>
        <Text style={styles.subtext}>{providerInfo}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceElevated,
    borderColor: colors.surfaceBorder,
    borderWidth: 1,
    borderRadius: radii.md,
    padding: spacing.md,
    marginVertical: spacing.sm,
  },
  icon: {
    marginRight: spacing.sm,
    marginTop: 2,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 2,
  },
  message: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  subtext: {
    ...typography.caption,
    fontSize: 11,
    color: colors.textMuted,
  },
});
