import { useMutation } from '@tanstack/react-query';
import { leakService } from '../services/leaks.service';
import { LeakSummary } from '../types/leaks';
import { useScanStore } from '../stores/useScanStore';

export function useLeakCheck() {
  const addScan = useScanStore((s) => s.addScan);
  const updateScanStatus = useScanStore((s) => s.updateScanStatus);

  return useMutation<LeakSummary, Error, string>({
    mutationFn: async (identifier) => {
      const scanId = `scan-leak-${Date.now()}`;
      addScan({
        id: scanId,
        type: 'LEAK',
        target: identifier,
        status: 'in_progress',
        progress: 50,
        startedAt: new Date().toISOString(),
      });

      try {
        const result = await leakService.checkIdentifier(identifier);
        updateScanStatus(
          scanId,
          'completed',
          100,
          `${result.numberOfBreaches} fuite(s) d’identifiants détectée(s)`
        );
        return result;
      } catch (err) {
        updateScanStatus(scanId, 'failed', 0, 'Échec de la recherche Leak DNA');
        throw err;
      }
    },
  });
}
