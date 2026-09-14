import { create } from 'zustand';
import { PrivacyConsent } from '../types/auth';

interface SettingsState {
  privacyConsent: PrivacyConsent;
  darkTheme: boolean;
  biometricsEnabled: boolean;
  updateConsent: (consent: Partial<PrivacyConsent>) => void;
  toggleBiometrics: () => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  privacyConsent: {
    analyticsAllowed: false,
    externalScanAllowed: true,
    localHistoryStored: true,
    consentGrantedAt: new Date().toISOString(),
  },
  darkTheme: true,
  biometricsEnabled: true,
  updateConsent: (newConsent) =>
    set((state) => ({
      privacyConsent: { ...state.privacyConsent, ...newConsent },
    })),
  toggleBiometrics: () =>
    set((state) => ({ biometricsEnabled: !state.biometricsEnabled })),
}));
