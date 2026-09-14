import { OsintProvider } from '../providers/osint/OsintProvider';
import { MockOsintProvider } from '../providers/osint/MockOsintProvider';
import { OsintQuery, OsintSearchResult } from '../types/osint';

export class OsintService {
  constructor(private provider: OsintProvider = new MockOsintProvider()) {}

  public async search(query: OsintQuery): Promise<OsintSearchResult> {
    return this.provider.search(query);
  }
}

export const osintService = new OsintService();
