export const SORT_OPTIONS = ['date-desc', 'date-asc', 'name-asc', 'name-desc'] as const;
export type SortOption = (typeof SORT_OPTIONS)[number];

export interface LaunchesQueryFilters {
  name?: string;
  upcoming?: boolean;
  success?: boolean;
  dateFrom?: string;
  dateTo?: string;
  sortBy?: SortOption;
}

export const BOOL_ALL_OPTIONS = ['all', 'true', 'false'] as const;
export type BoolAndAll = (typeof BOOL_ALL_OPTIONS)[number];

export interface LaunchesFiltersFormValues {
  name: string;
  upcoming: BoolAndAll;
  success: BoolAndAll;
  dateFrom: string;
  dateTo: string;
  sortBy: SortOption;
}

export const DEFAULT_FILTER_VALUES: LaunchesFiltersFormValues = {
  name: '',
  upcoming: 'all',
  success: 'all',
  dateFrom: '',
  dateTo: '',
  sortBy: 'date-desc',
};
