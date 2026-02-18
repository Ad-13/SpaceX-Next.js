export type { LaunchesQueryFilters, SortOption } from './filters';

export interface LaunchLinks {
  flickr: {
    original: string[];
  };
  patch?: {
    small?: string;
    large?: string;
  };
  wikipedia?: string;
  webcast?: string;
}

export interface Launch {
  id: string;
  name: string;
  date_utc: string;
  success: boolean | null;
  upcoming: boolean;
  details: string | null;
  links: LaunchLinks;
  rocket: string;
  launchpad: string;
}

// paginate-query

export type MongoSortOrder = 1 | -1;

export interface SpaceXQueryOptions {
  page: number;
  limit: number;
  sort?: Record<string, MongoSortOrder>;
  select?: string[];
}

export interface SpaceXQueryPayload {
  query: Record<string, unknown>;
  options: SpaceXQueryOptions;
}

export interface LaunchesResponse {
  docs: Launch[];
  totalDocs: number;
  totalPages: number;
  page: number;
  hasNextPage: boolean;
  nextPage?: number;
}
