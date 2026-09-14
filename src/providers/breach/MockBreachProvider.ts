import { BreachProvider } from './BreachProvider';
import { LeakSummary } from '../../types/leaks';
import { MOCK_LEAK_SUMMARY } from '../../mocks/leaks.mock';

export class MockBreachProvider implements BreachProvider {
  public async checkIdentifier(identifier: string): Promise<LeakSummary> {
    // Simulate realistic async network delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    return {
      ...MOCK_LEAK_SUMMARY,
      identifier,
      lastCheckedAt: new Date().toISOString(),
    };
  }
}
