import { useMutation } from '@tanstack/react-query';
import { osintService } from '../services/osint.service';
import { OsintQuery, OsintSearchResult } from '../types/osint';
import { useScanStore } from '../stores/useScanStore';

export function useOsintScan() {
  const addScan = useScanStore((s) => s.addScan);
  const updateScanStatus = useScanStore((s) => s.updateScanStatus);

  return useMutation<OsintSearchResult, Error, OsintQuery>({
    mutationFn: async (query) => {
      const scanId = `scan-osint-${Date.now()}`;
      addScan({
        id: scanId,
        type: 'OSINT',
        target: query.targetValue,
        status: 'in_progress',
        progress: 40,
        startedAt: new Date().toISOString(),
      });

      try {
        const result = await osintService.search(query);
        updateScanStatus(
          scanId,
          'completed',
          100,
          `Identité numérique corrélée (${result.totalFound} nœuds)`
        );
        return result;
      } catch (err) {
        updateScanStatus(scanId, 'failed', 0, 'Échec de la recherche OSINT');
        throw err;
      }
    },
  });
}
