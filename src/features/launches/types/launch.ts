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
  search?: string; // mission name search
}

export interface LaunchesResponse {
  docs: Launch[];
  totalPages: number;
  page: number;
}
