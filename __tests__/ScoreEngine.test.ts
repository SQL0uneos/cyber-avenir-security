import { SecurityScoreEngine } from '../src/core/score-engine/ScoreEngine';
import { SecuritySignal } from '../src/types/score';

describe('SecurityScoreEngine', () => {
  const engine = new SecurityScoreEngine();

  it('should return 100 optimal score when signals array is empty', () => {
    const res = engine.calculateScore([]);
    expect(res.score).toBe(100);
    expect(res.level).toBe('optimal');
    expect(res.topRisks.length).toBe(0);
  });

  it('should deduct weighted score for signals and compute risk level', () => {
    const signals: SecuritySignal[] = [
      {
        id: 'sig-1',
        category: 'mfa',
        severity: 'high',
        weight: 20,
        source: 'Test',
        title: 'MFA Missing',
        description: 'No 2FA',
        confidence: 1.0,
        timestamp: new Date().toISOString(),
      },
      {
        id: 'sig-2',
        category: 'email_exposure',
        severity: 'critical',
        weight: 30,
        source: 'Breach',
        title: 'Leaked Email',
        description: 'Exposed',
        confidence: 1.0,
        timestamp: new Date().toISOString(),
      },
    ];

    const res = engine.calculateScore(signals);
    expect(res.score).toBe(50); // 100 - (20 + 30) = 50
    expect(res.level).toBe('vulnerable');
    expect(res.topRisks.length).toBe(2);
    expect(res.recommendations.length).toBe(2);
  });
});
