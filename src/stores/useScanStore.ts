import { create } from 'zustand';
import { Scan, ScanType } from '../types/scan';
import { MOCK_RECENT_SCANS } from '../mocks/dashboard.mock';

interface ScanStoreState {
  scans: Scan[];
  addScan: (scan: Scan) => void;
  updateScanStatus: (
    id: string,
    status: Scan['status'],
    progress: number,
    resultSummary?: string,
    resultId?: string
  ) => void;
  clearHistory: () => void;
}

export const useScanStore = create<ScanStoreState>((set) => ({
  scans: MOCK_RECENT_SCANS,
  addScan: (newScan) =>
    set((state) => ({ scans: [newScan, ...state.scans] })),
  updateScanStatus: (id, status, progress, resultSummary, resultId) =>
    set((state) => ({
      scans: state.scans.map((s) =>
        s.id === id
          ? {
              ...s,
              status,
              progress,
              resultSummary: resultSummary ?? s.resultSummary,
              resultId: resultId ?? s.resultId,
              completedAt: status === 'completed' ? new Date().toISOString() : s.completedAt,
            }
          : s
      ),
    })),
  clearHistory: () => set({ scans: [] }),
}));
