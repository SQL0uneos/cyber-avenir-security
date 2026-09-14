import { EntityCorrelationEngine } from '../src/core/correlation/EntityCorrelationEngine';
import { OsintNormalizedResult } from '../src/types/osint';

describe('EntityCorrelationEngine', () => {
  const engine = new EntityCorrelationEngine();

  it('should build DigitalIdentity entity graph from raw OSINT findings', () => {
    const rawResults: OsintNormalizedResult[] = [
      {
        id: 'res-1',
        provider: 'GitHub',
        category: 'code',
        target: 'lounes99',
        title: 'GitHub Profile',
        confidence: 0.9,
        metadata: { username: 'lounes99', email: 'lounes@example.com' },
        discoveredAt: new Date().toISOString(),
      },
    ];

    const identity = engine.correlate('lounes99', 'username', rawResults);
    expect(identity.primaryIdentifier).toBe('lounes99');
    expect(identity.usernames).toContain('lounes99');
    expect(identity.emails).toContain('lounes@example.com');
    expect(identity.platforms).toContain('GitHub');
    expect(identity.relations.length).toBe(2);
  });
});
