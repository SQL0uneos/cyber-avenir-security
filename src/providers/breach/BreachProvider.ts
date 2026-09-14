import { LeakSummary } from '../../types/leaks';

export interface BreachProvider {
  checkIdentifier(identifier: string): Promise<LeakSummary>;
}
