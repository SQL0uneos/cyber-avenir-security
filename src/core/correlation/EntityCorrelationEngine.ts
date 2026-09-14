import {
  OsintNormalizedResult,
  DigitalIdentity,
  IdentityRelation,
} from '../../types/osint';

export class EntityCorrelationEngine {
  public correlate(
    primaryTarget: string,
    targetType: string,
    rawResults: OsintNormalizedResult[]
  ): DigitalIdentity {
    const usernames = new Set<string>();
    const emails = new Set<string>();
    const platforms = new Set<string>();
    const domains = new Set<string>();
    const aliases = new Set<string>();
    const relations: IdentityRelation[] = [];

    if (targetType === 'username') usernames.add(primaryTarget);
    if (targetType === 'email') emails.add(primaryTarget);
    if (targetType === 'domain') domains.add(primaryTarget);
    aliases.add(primaryTarget);

    rawResults.forEach((res, index) => {
      platforms.add(res.provider);

      if (res.metadata.username && typeof res.metadata.username === 'string') {
        usernames.add(res.metadata.username);
        relations.push({
          id: `rel-u-${index}`,
          sourceEntity: primaryTarget,
          targetEntity: res.metadata.username,
          relationType: 'uses_username',
          confidence: res.confidence,
        });
      }

      if (res.metadata.email && typeof res.metadata.email === 'string') {
        emails.add(res.metadata.email);
        relations.push({
          id: `rel-e-${index}`,
          sourceEntity: primaryTarget,
          targetEntity: res.metadata.email,
          relationType: 'linked_email',
          confidence: res.confidence,
        });
      }

      if (res.metadata.domain && typeof res.metadata.domain === 'string') {
        domains.add(res.metadata.domain);
        relations.push({
          id: `rel-d-${index}`,
          sourceEntity: primaryTarget,
          targetEntity: res.metadata.domain,
          relationType: 'registered_domain',
          confidence: res.confidence,
        });
      }
    });

    const totalFound = rawResults.length;
    const confidenceScore = Math.min(
      95,
      Math.round(
        rawResults.reduce((acc, curr) => acc + curr.confidence, 0) /
          Math.max(1, totalFound) *
          100
      )
    );

    let exposureLevel: 'low' | 'moderate' | 'high' | 'critical' = 'low';
    if (totalFound > 8) exposureLevel = 'critical';
    else if (totalFound > 4) exposureLevel = 'high';
    else if (totalFound > 2) exposureLevel = 'moderate';

    return {
      id: `id-${Date.now()}`,
      primaryIdentifier: primaryTarget,
      aliases: Array.from(aliases),
      usernames: Array.from(usernames),
      emails: Array.from(emails),
      platforms: Array.from(platforms),
      domains: Array.from(domains),
      relations,
      confidenceScore,
      exposureLevel,
      updatedAt: new Date().toISOString(),
    };
  }
}

export const entityCorrelationEngine = new EntityCorrelationEngine();
