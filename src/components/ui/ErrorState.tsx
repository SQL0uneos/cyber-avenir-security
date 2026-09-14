import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { colors } from '../../theme/colors';
import { typography, spacing } from '../../theme/spacing';
import { Button } from './Button';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Erreur d’analyse',
  message = 'Impossible de contacter le service de sécurité.',
  onRetry,
}) => {
  return (
    <View style={styles.center}>
      <Text style={styles.errorTitle}>{title}</Text>
      <Text style={styles.errorMessage}>{message}</Text>
      {onRetry && (
        <Button
          title="Réessayer"
          onPress={onRetry}
          variant="outline"
          size="sm"
          style={styles.retryButton}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorTitle: {
    ...typography.titleSmall,
    color: colors.critical,
    marginBottom: spacing.xs,
  },
  errorMessage: {
    ...typography.bodyMedium,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  retryButton: {
    marginTop: spacing.xs,
  },
});
