import { osintQuerySchema } from '../src/schemas/osint';
import { leakCheckSchema } from '../src/schemas/leaks';
import { scamAnalysisSchema } from '../src/schemas/scamhunt';

describe('Zod Validation Schemas', () => {
  it('should validate valid OSINT queries', () => {
    const valid = osintQuerySchema.safeParse({
      targetType: 'username',
      targetValue: 'alex99',
    });
    expect(valid.success).toBe(true);
  });

  it('should reject empty or invalid OSINT queries', () => {
    const invalid = osintQuerySchema.safeParse({
      targetType: 'username',
      targetValue: 'a',
    });
    expect(invalid.success).toBe(false);
  });

  it('should validate Leak check email identifier', () => {
    const res = leakCheckSchema.safeParse({ identifier: 'test@domain.com' });
    expect(res.success).toBe(true);
  });

  it('should validate ScamHunt input', () => {
    const res = scamAnalysisSchema.safeParse({
      inputType: 'url',
      content: 'https://phishing-site.com',
    });
    expect(res.success).toBe(true);
  });
});
