import { useMutation } from '@tanstack/react-query';
import { scamHuntService } from '../services/scamhunt.service';
import { ScamInputType, ScamAnalysis } from '../types/scamhunt';
import { useScanStore } from '../stores/useScanStore';

export function useScamAnalysis() {
  const addScan = useScanStore((s) => s.addScan);
  const updateScanStatus = useScanStore((s) => s.updateScanStatus);

  return useMutation<
    ScamAnalysis,
    Error,
    { type: ScamInputType; content: string }
  >({
    mutationFn: async ({ type, content }) => {
      const scanId = `scan-scam-${Date.now()}`;
      addScan({
        id: scanId,
        type: 'SCAM',
        target: content.substring(0, 40),
        status: 'in_progress',
        progress: 60,
        startedAt: new Date().toISOString(),
      });

      try {
        const result = await scamHuntService.analyze(type, content);
        updateScanStatus(
          scanId,
          'completed',
          100,
          `${result.verdict} - Risk Score ${result.riskScore}/100`,
          result.id
        );
        return result;
      } catch (err) {
        updateScanStatus(scanId, 'failed', 0, 'Échec de l’analyse ScamHunt');
        throw err;
      }
    },
  });
}
