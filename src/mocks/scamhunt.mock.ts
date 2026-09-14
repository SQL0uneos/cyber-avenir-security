import { ScamAnalysis } from '../types/scamhunt';

export const MOCK_SCAM_ANALYSES: Record<string, ScamAnalysis> = {
  malicious_url: {
    id: 'scam-analysis-101',
    inputType: 'url',
    submittedContent: 'https://secure-login-banque-verification-update.com/account/login',
    verdict: 'Malicious',
    verdictLabel: 'Probable Phishing Avéré',
    riskScore: 94,
    indicators: [
      {
        id: 'ind-1',
        code: 'SUSPICIOUS_DOMAIN',
        name: 'Domaine Typosquatting / Usurpation',
        description: 'Le nom de domaine imite une banque officielle sans lui appartenir.',
        severity: 'critical',
      },
      {
        id: 'ind-2',
        code: 'CREDENTIAL_HARVESTING',
        name: 'Collecte d’identifiants ciblée',
        description: 'Formulaire de connexion masqué exigeant des données de carte/pass.',
        severity: 'critical',
      },
      {
        id: 'ind-3',
        code: 'RECENTLY_REGISTERED',
        name: 'Domaine créé il y a 3 jours',
        description: 'Enregistrement WHOIS extrêmement récent, typique des campagnes de phishing temporaires.',
        severity: 'high',
      },
      {
        id: 'ind-4',
        code: 'SUSPICIOUS_REDIRECT',
        name: 'Redirections masquées',
        description: 'Présence de redirections en chaîne visant à tromper les crawlers de sécurité.',
        severity: 'medium',
      },
    ],
    reassurances: [],
    recommendations: [
      'Ne saisissez AUCUNE information personnelle ni identifiant sur cette page.',
      'Fermez immédiatement cet onglet de navigateur.',
      'Si vous avez saisi vos identifiants, changez immédiatement le mot de passe sur le site officiel.',
      'Signalez cette URL à la plateforme Pharos et à votre organisme bancaire.',
    ],
    analyzedAt: new Date().toISOString(),
  },
  suspicious_text: {
    id: 'scam-analysis-102',
    inputType: 'text',
    submittedContent:
      'Info Chronopost: Votre colis 489234 demande un règlement de douane de 1.99€. Veuillez régulariser sous 24h sur http://colis-verification-suivi.fr',
    verdict: 'Suspicious',
    verdictLabel: 'Incohérences & Urgence Détectées',
    riskScore: 78,
    indicators: [
      {
        id: 'ind-5',
        code: 'URGENCY_LANGUAGE',
        name: 'Pression temporelle artificielle',
        description: 'Utilisation de termes d’urgence ("sous 24h") incitant à agir sous impulsion.',
        severity: 'high',
      },
      {
        id: 'ind-6',
        code: 'UNOFFICIAL_SHORT_LINK',
        name: 'Lien non officiel',
        description: 'Le domaine du lien SMS ne correspond pas aux domaines officiels de Chronopost (chronopost.fr).',
        severity: 'high',
      },
    ],
    reassurances: [
      'Les frais de douane réels s’affichent sur le compte client officiel du transporteur.',
    ],
    recommendations: [
      'Ne cliquez pas sur le lien fourni dans le SMS.',
      'Connectez-vous directement sur l’application officielle ou sur chronopost.fr.',
      'Transférez le SMS au 33700 (plateforme officielle de signalement des spams).',
    ],
    analyzedAt: new Date().toISOString(),
  },
  safe_sample: {
    id: 'scam-analysis-103',
    inputType: 'url',
    submittedContent: 'https://github.com/cyber-avenir',
    verdict: 'Safe',
    verdictLabel: 'Aucun indicateur de menace détecté',
    riskScore: 4,
    indicators: [],
    reassurances: [
      'Domaine légitime certifié et réputé.',
      'Certificat SSL/TLS valide émis par une autorité reconnue.',
      'Aucun enregistrement dans les bases de données d’hameçonnage.',
    ],
    recommendations: [
      'Navigation sécurisée. Vous pouvez poursuivre en toute confiance.',
    ],
    analyzedAt: new Date().toISOString(),
  },
};
