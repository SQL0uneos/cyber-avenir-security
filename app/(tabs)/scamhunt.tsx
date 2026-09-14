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
import { useScamAnalysis } from '../../src/hooks/useScamAnalysis';
import { ScamInputType, ScamAnalysis, ScamVerdict } from '../../src/types/scamhunt';
import { colors } from '../../src/theme/colors';
import { typography, spacing, radii } from '../../src/theme/spacing';
import { SearchCheck, Link, MessageSquare, Image as ImageIcon, AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react-native';

const INPUT_TYPES: { type: ScamInputType; label: string; icon: any }[] = [
  { type: 'url', label: 'Lien / URL', icon: Link },
  { type: 'text', label: 'Texte / SMS', icon: MessageSquare },
  { type: 'image', label: 'Capture Écran', icon: ImageIcon },
];

export default function ScamHuntScreen() {
  const [inputType, setInputType] = useState<ScamInputType>('url');
  const [content, setContent] = useState(
    'https://secure-login-banque-verification-update.com/account/login'
  );
  const [analysisResult, setAnalysisResult] = useState<ScamAnalysis | null>(null);

  const { mutate: runAnalysis, isPending } = useScamAnalysis();

  const handleAnalyze = () => {
    if (!content.trim()) return;
    runAnalysis(
      { type: inputType, content: content.trim() },
      {
        onSuccess: (data) => setAnalysisResult(data),
      }
    );
  };

  const getVerdictBadgeProps = (verdict: ScamVerdict) => {
    switch (verdict) {
      case 'Malicious':
        return { label: 'Malveillant / Phishing', bg: colors.criticalBg, fg: colors.critical };
      case 'Suspicious':
        return { label: 'Suspect / Risqué', bg: colors.highBg, fg: colors.high };
      case 'Safe':
        return { label: 'Sûr / Légitime', bg: colors.primaryGlow, fg: colors.primary };
      default:
        return { label: 'Indéterminé', bg: colors.surfaceElevated, fg: colors.textMuted };
    }
  };

  return (
    <Screen scrollable>
      <View style={styles.header}>
        <SearchCheck size={28} color={colors.primary} />
        <View style={styles.headerText}>
          <Text style={styles.title}>ScamHunt Phishing Detector</Text>
          <Text style={styles.subtitle}>
            Analysez la légitimité des liens, messages et spams suspects
          </Text>
        </View>
      </View>

      {/* Input Selector */}
      <Card style={styles.inputCard}>
        <Text style={styles.selectorLabel}>Format du contenu à soumettre :</Text>
        <View style={styles.typeSelectorRow}>
          {INPUT_TYPES.map((t) => {
            const Icon = t.icon;
            const active = inputType === t.type;
            return (
              <TouchableOpacity
                key={t.type}
                style={[styles.typePill, active && styles.typePillActive]}
                onPress={() => setInputType(t.type)}
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
          multiline={inputType === 'text'}
          numberOfLines={inputType === 'text' ? 4 : 1}
          placeholder={
            inputType === 'url'
              ? 'Collez le lien suspect (ex: http://...)'
              : inputType === 'text'
              ? 'Collez le contenu du SMS ou mail reçu...'
              : 'Simulation capture d’écran...'
          }
          value={content}
          onChangeText={setContent}
        />

        <PrivacyNotice message="Les heuristiques analysent la syntaxe sans envoyer de données personnelles nominatives." />

        <Button
          title="Analyser la menace avec ScamHunt"
          onPress={handleAnalyze}
          loading={isPending}
          icon={<SearchCheck size={18} color={colors.background} />}
        />
      </Card>

      {isPending && <LoadingState message="Évaluation des indicateurs d’hameçonnage..." />}

      {analysisResult && !isPending && (
        <>
          {/* Verdict Banner */}
          <Card elevated style={styles.verdictCard}>
            <View style={styles.verdictHeader}>
              <View style={styles.verdictTitleGroup}>
                <Text style={styles.verdictSubtitle}>VERDICT SÉCURITÉ</Text>
                <Text style={styles.verdictLabelText}>{analysisResult.verdictLabel}</Text>
              </View>
              {(() => {
                const props = getVerdictBadgeProps(analysisResult.verdict);
                return <Badge label={props.label} color={props.fg} backgroundColor={props.bg} />;
              })()}
            </View>

            <View style={styles.scoreRow}>
              <Text style={styles.scoreText}>
                Indice de Risque :{' '}
                <Text
                  style={{
                    color:
                      analysisResult.riskScore > 70
                        ? colors.critical
                        : analysisResult.riskScore > 30
                        ? colors.high
                        : colors.primary,
                  }}
                >
                  {analysisResult.riskScore} / 100
                </Text>
              </Text>
            </View>
          </Card>

          {/* Detected Indicators */}
          <Section title={`Indicateurs Détectés (${analysisResult.indicators.length})`}>
            {analysisResult.indicators.length === 0 ? (
              <Card style={styles.safeCard}>
                <CheckCircle2 size={20} color={colors.primary} />
                <Text style={styles.safeText}>
                  Aucun indicateur de fraude ou d’hameçonnage n’a été détecté.
                </Text>
              </Card>
            ) : (
              analysisResult.indicators.map((ind) => (
                <Card key={ind.id} style={styles.indicatorCard}>
                  <View style={styles.indHeader}>
                    <AlertTriangle size={16} color={colors.critical} />
                    <Text style={styles.indName}>{ind.name}</Text>
                  </View>
                  <Text style={styles.indDesc}>{ind.description}</Text>
                </Card>
              ))
            )}
          </Section>

          {/* Actionable Recommendations */}
          <Section title="Recommandations du Cockpit">
            {analysisResult.recommendations.map((rec, i) => (
              <View key={i} style={styles.recRow}>
                <ShieldCheck size={16} color={colors.primary} style={{ marginTop: 2 }} />
                <Text style={styles.recText}>{rec}</Text>
              </View>
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
  inputCard: {
    marginBottom: spacing.md,
  },
  selectorLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    fontWeight: '600',
  },
  typeSelectorRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginBottom: spacing.sm,
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
  verdictCard: {
    marginBottom: spacing.md,
  },
  verdictHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  verdictTitleGroup: {
    flex: 1,
  },
  verdictSubtitle: {
    ...typography.badge,
    color: colors.primary,
    marginBottom: 2,
  },
  verdictLabelText: {
    ...typography.titleSmall,
    color: colors.textPrimary,
  },
  scoreRow: {
    borderTopWidth: 1,
    borderTopColor: colors.surfaceBorder,
    paddingTop: spacing.xs,
  },
  scoreText: {
    ...typography.bodyMedium,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  indicatorCard: {
    marginBottom: spacing.xs,
  },
  indHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: 2,
  },
  indName: {
    ...typography.bodyMedium,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  indDesc: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  safeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  safeText: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
    flex: 1,
  },
  recRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  recText: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
    flex: 1,
  },
});
