import { OsintNormalizedResult } from '../types/osint';

export const MOCK_OSINT_RESULTS: Record<string, OsintNormalizedResult[]> = {
  default: [
    {
      id: 'osint-res-1',
      provider: 'GitHub API',
      category: 'code',
      target: 'alexdev99',
      url: 'https://github.com/alexdev99',
      title: 'Profil GitHub Développeur Public',
      confidence: 0.98,
      metadata: {
        username: 'alexdev99',
        publicRepos: 14,
        email: 'alex.dev99@gmail.com',
        location: 'Paris, France',
      },
      discoveredAt: '2026-09-14T20:00:00Z',
    },
    {
      id: 'osint-res-2',
      provider: 'LinkedIn Scraper Adapter',
      category: 'social',
      target: 'alexdev99',
      url: 'https://linkedin.com/in/alex-dev-cyber',
      title: 'Compte professionnel d’ingénieur sécurité',
      confidence: 0.88,
      metadata: {
        username: 'alex-dev-cyber',
        company: 'Cyber Security Lab',
      },
      discoveredAt: '2026-09-14T20:00:00Z',
    },
    {
      id: 'osint-res-3',
      provider: 'Pastebin Threat Monitor',
      category: 'paste',
      target: 'alex.dev99@gmail.com',
      url: 'https://pastebin.com/raw/x8K90Lz',
      title: 'Extrait de fuite d’identifiants (Combo List)',
      confidence: 0.75,
      metadata: {
        email: 'alex.dev99@gmail.com',
        pasteDate: '2023-11-04',
      },
      discoveredAt: '2026-09-14T20:00:00Z',
    },
    {
      id: 'osint-res-4',
      provider: 'DNS Recon Adapter',
      category: 'dns',
      target: 'alexdev.io',
      url: 'https://alexdev.io',
      title: 'Domaine personnel enregistré',
      confidence: 0.92,
      metadata: {
        domain: 'alexdev.io',
        registrar: 'Namecheap',
      },
      discoveredAt: '2026-09-14T20:00:00Z',
    },
  ],
};
