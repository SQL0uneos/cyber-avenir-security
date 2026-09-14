import { useQuery } from '@tanstack/react-query';
import { vaultService } from '../services/vault.service';

export function useVaultState() {
  return useQuery({
    queryKey: ['vault-state'],
    queryFn: () => vaultService.getVaultState(),
  });
}
