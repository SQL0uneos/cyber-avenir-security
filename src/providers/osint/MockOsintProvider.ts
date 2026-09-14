import { OsintProvider } from './OsintProvider';
import { OsintQuery, OsintSearchResult } from '../../types/osint';
import { MOCK_OSINT_RESULTS } from '../../mocks/osint.mock';
import { entityCorrelationEngine } from '../../core/correlation/EntityCorrelationEngine';

export class MockOsintProvider implements OsintProvider {
  public async search(query: OsintQuery): Promise<OsintSearchResult> {
    const startTime = Date.now();
    await new Promise((resolve) => setTimeout(resolve, 800));

    const rawResults = MOCK_OSINT_RESULTS.default.map((item) => ({
      ...item,
      target: query.targetValue,
    }));

    const digitalIdentity = entityCorrelationEngine.correlate(
      query.targetValue,
      query.targetType,
      rawResults
    );

    return {
      query,
      results: rawResults,
      digitalIdentity,
      totalFound: rawResults.length,
      durationMs: Date.now() - startTime,
      searchedAt: new Date().toISOString(),
    };
  }
}
