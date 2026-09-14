import { BreachIncident, LeakSummary } from '../types/leaks';

export const MOCK_BREACH_INCIDENTS: BreachIncident[] = [
  {
    id: 'breach-linkedin-2021',
    serviceName: 'LinkedIn Data Leak',
    domain: 'linkedin.com',
    breachDate: '2021-06-22',
    addedDate: '2021-06-25',
    pwnCount: 700000000,
    description:
      'Une fuite massive comprenant des emails, noms complets, numéros de téléphone et profils professionnels.',
    dataClasses: ['Email addresses', 'Full names', 'Phone numbers', 'Geographic locations'],
    isVerified: true,
    isFabricated: false,
    isSensitive: false,
    severity: 'high',
  },
  {
    id: 'breach-canva-2019',
    serviceName: 'Canva Security Breach',
    domain: 'canva.com',
    breachDate: '2019-05-24',
    addedDate: '2019-05-28',
    pwnCount: 137000000,
    description:
      'Compromission de la base de données de comptes Canva exposant mots de passe hachés (bcrypt) et identifiants.',
    dataClasses: ['Email addresses', 'Passwords (bcrypt)', 'Usernames', 'Cities'],
    isVerified: true,
    isFabricated: false,
    isSensitive: false,
    severity: 'critical',
  },
  {
    id: 'breach-deezer-2023',
    serviceName: 'Deezer Scraping Leak',
    domain: 'deezer.com',
    breachDate: '2023-01-03',
    addedDate: '2023-01-05',
    pwnCount: 240000000,
    description:
      'Un partenaire tiers de Deezer a exposé une base de données contenant les données de profils d’utilisateurs.',
    dataClasses: ['Email addresses', 'Dates of birth', 'IP addresses', 'User ID'],
    isVerified: true,
    isFabricated: false,
    isSensitive: false,
    severity: 'medium',
  },
  {
    id: 'breach-shadow-2025',
    serviceName: 'Shadow Cloud Incident',
    domain: 'shadow.tech',
    breachDate: '2025-02-10',
    addedDate: '2025-02-12',
    pwnCount: 500000,
    description:
      'Attaque par ingénierie sociale ciblée ayant conduit à l’exfiltration partielle de données clients.',
    dataClasses: ['Email addresses', 'Billing addresses', 'Subscription plans'],
    isVerified: true,
    isFabricated: false,
    isSensitive: true,
    severity: 'high',
  },
];

export const MOCK_LEAK_SUMMARY: LeakSummary = {
  identifier: 'alex.dev99@gmail.com',
  numberOfBreaches: 4,
  affectedServices: ['LinkedIn', 'Canva', 'Deezer', 'Shadow Tech'],
  exposedDataTypes: ['Mots de passe hachés', 'Adresses Email', 'Numéros de téléphone', 'Adresses IP'],
  recurrenceScore: 68,
  riskScore: 74,
  timeline: [
    { year: 2025, incidents: [MOCK_BREACH_INCIDENTS[3]] },
    { year: 2023, incidents: [MOCK_BREACH_INCIDENTS[2]] },
    { year: 2021, incidents: [MOCK_BREACH_INCIDENTS[0]] },
    { year: 2019, incidents: [MOCK_BREACH_INCIDENTS[1]] },
  ],
  lastCheckedAt: new Date().toISOString(),
};
