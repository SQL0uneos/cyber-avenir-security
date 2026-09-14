# Cyber Avenir Security - Mobile Architecture & Developer Documentation

## 1. Executive Summary

**Cyber Avenir Security** est un cockpit mobile de sécurité numérique personnelle ("Personal Digital Security Cockpit") développé pour l’association **Cyber Avenir**.

L’application est conçue selon un découplage strict entre l'UI, la logique métier, la gestion d'état et les fournisseurs de données externes (Provider Adapter Pattern). Elle est 100% opérationnelle avec des mock providers réalistes et prête pour un raccordement direct à une API Backend unique.

---

## 2. Pile Technologique (Pure Mobile)

- **Framework Core** : Expo (SDK 52), React Native, TypeScript Strict
- **Routing & Navigation** : Expo Router v4 (Navigation basée sur les fichiers avec onglets `app/(tabs)/`)
- **State Management** :
  - **TanStack Query (React Query v5)** : Caching des données d'analyse distantes, retries et mutations.
  - **Zustand v5** : État client local (Auth session, historique des scans, consentement de confidentialité).
- **Validation & Formulaires** : Zod + React Hook Form + `@hookform/resolvers`
- **Design System** : Custom Dark Theme (Obsidian `#0A0D14`, Cyber Emerald `#00E5A3`, Neon Cyan `#00D2FF`) avec `lucide-react-native` et `react-native-svg`.

---

## 3. Architecture des Modules

```
Cyber Avenir Security
├── 1. Cockpit Home Dashboard
│   └── Visualise le Security Score Global (ex: 78/100), les risques prioritaires et les actions rapides.
│
├── 2. CyberVault (Diagnostic & Pilotage)
│   └── Diagnostic de sécurité par catégories (Comptes, MFA, Mots de passe, Devices, Réseaux sociaux).
│
├── 3. OSINT Radar Engine
│   └── Recherche d'exposition sur usernames, emails et domaines avec EntityCorrelationEngine.
│
├── 4. Leak DNA Scanner
│   └── Timeline chronologique des fuites de données (2019-2025) et calcul des scores de récidive.
│
└── 5. ScamHunt Phishing Detector
    └── Analyseur d'URL, SMS et captures d'écran avec verdicts probabilistes éthiques ("Malicious", "Suspicious", "Safe").
```

---

## 4. Architecture des Adapters & Abstractions

Aucun composant UI n'appelle directement d'API externe ou de service HTTP. Tout transite par des interfaces et des adapters interchangeables :

```
[UI Screen]
     │
     ▼
[TanStack Query Hook] (e.g. useOsintScan)
     │
     ▼
[Service] (e.g. OsintService)
     │
     ▼
[Provider Interface] (e.g. OsintProvider)
     ├── MockOsintProvider (Version Mobile Actuelle)
     └── ProductionApiOsintProvider (Backend Futur)
```

---

## 5. Security Score Engine

Le moteur `SecurityScoreEngine` (situé dans `src/core/score-engine/ScoreEngine.ts`) calcule de manière déterministe le score global (0 à 100) en consommant des `SecuritySignal[]`.

- **Formule** : $Score = \max(0, 100 - \sum (Weight_i \times Confidence_i))$
- **Niveaux de Risque** :
  - `< 40` : Critical
  - `40 - 69` : Vulnerable
  - `70 - 84` : Good
  - `85 - 100` : Optimal

---

## 6. Guide de Migration vers une API Backend

Pour raccorder l'application à un backend réel sans réécrire l'interface utilisateur :
1. Définissez la variable d'environnement `EXPO_PUBLIC_API_URL` dans votre fichier `.env`.
2. Implémentez un adapter de production satisfaisant l'interface du fournisseur (ex: `ProductionBreachProvider implements BreachProvider`).
3. Injectez l'adapter de production dans l'instance du service correspondant (`src/services/leaks.service.ts`).
