export interface Launch {
  id: string;
  name: string;
  date_utc: string;
  success: boolean | null;
  upcoming: boolean;
  details: string | null;
  links: {
    flickr: {
      original: string[];
    };
    patch?: {
      small?: string;
      large?: string;
    };
    wikipedia?: string;
    webcast?: string;
  };
  rocket: string;
  launchpad: string;
}

export interface LaunchesQueryFilters {
  upcoming?: boolean;
  success?: boolean;
  dateFrom?: string;
  dateTo?: string;
  name?: string;
}

export interface SpaceXQueryPayload {
  query: Record<string, unknown>;
  options: {
    page: number;
    limit: number;
    sort?: Record<string, 1 | -1>;
    select?: string[];
  };
}

export interface LaunchesResponse {
  docs: Launch[];
  totalPages: number;
  page: number;
  hasNextPage: boolean;
  nextPage?: number;
}
