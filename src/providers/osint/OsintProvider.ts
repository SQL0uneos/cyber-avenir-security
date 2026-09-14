import { OsintQuery, OsintSearchResult } from '../../types/osint';

export interface OsintProvider {
  search(query: OsintQuery): Promise<OsintSearchResult>;
}
