import { BreachProvider } from '../providers/breach/BreachProvider';
import { MockBreachProvider } from '../providers/breach/MockBreachProvider';
import { LeakSummary } from '../types/leaks';

export class LeakService {
  constructor(private provider: BreachProvider = new MockBreachProvider()) {}

  public async checkIdentifier(identifier: string): Promise<LeakSummary> {
    return this.provider.checkIdentifier(identifier);
  }
}

export const leakService = new LeakService();
