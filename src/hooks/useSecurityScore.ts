import { useQuery } from '@tanstack/react-query';
import { vaultService } from '../services/vault.service';

export function useSecurityScore() {
  return useQuery({
    queryKey: ['security-score'],
    queryFn: () => vaultService.getSecurityScore(),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}
