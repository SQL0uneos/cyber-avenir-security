# Cyber Avenir Security - Personal Digital Security Cockpit

![Cyber Avenir Security](https://img.shields.io/badge/Expo-SDK%2052-000000?style=for-the-badge&logo=expo)
![React Native](https://img.shields.io/badge/React%20Native-0.76-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=for-the-badge&logo=typescript)

**Cyber Avenir Security** est l'application mobile grand public éditée par l'association **Cyber Avenir**. Conçue comme un **cockpit de sécurité numérique personnelle**, elle permet à chaque utilisateur de mesurer, comprendre et améliorer son exposition numérique globale.

---

## 🌟 Fonctionnalités Principales

1. **Cyber Security Cockpit** : Dashboard central répondant à la question *"Comment va ma sécurité numérique ?"* avec un Security Score global (ex: 78/100), l'affichage des risques prioritaires et des actions recommandées.
2. **CyberVault** : Centre de diagnostic et de pilotage de la sécurité personnelle (inventaire des comptes, statut MFA, politique de mots de passe, audit des privilèges).
3. **OSINT Identity Radar** : Moteur modulaire d'évaluation de l'exposition publique (pseudos, emails, domaines) avec corrélation d'identité numérique (`DigitalIdentity`).
4. **Leak DNA Scanner** : Détection de compromission d'identifiants avec timeline chronologique (2019-2025) et calcul des scores de récidive et de risque.
5. **ScamHunt Phishing Detector** : Analyseur probabiliste de menaces (liens URL, SMS, captures d'écran) fournissant un verdict éthique sans certitudes trompeuses.
6. **Privacy Center** : Garantie de confidentialité, aucun mot de passe stocké en clair, transparence sur les flux et purge locale des données.

---

## 🛠️ Installation & Démarrage

### Prérequis
- Node.js v18+
- Expo Go sur votre smartphone ou un émulateur iOS / Android

### Cloner et installer les dépendances
```bash
git clone https://github.com/SQL0uneos/cyber-avenir-security.git
cd cyber-avenir-security
npm install
```

### Lancer l'application Expo
```bash
npm start
```

### Lancer les tests unitaires
```bash
npm test
```

### Vérifier le typage TypeScript
```bash
npm run lint
```
