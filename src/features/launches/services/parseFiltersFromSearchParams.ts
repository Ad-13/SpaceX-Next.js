import { LaunchesQueryFilters, SortOption, SORT_OPTIONS } from '../types/filters';

function parseSortOption(value: unknown): SortOption {
  if (SORT_OPTIONS.includes(value as SortOption)) {
    return value as SortOption;
  }
  return 'date-desc';
}

export function parseFiltersFromSearchParams(
  searchParams: Record<string, string | undefined>
): LaunchesQueryFilters {
  const {name, dateFrom, dateTo, sortBy} = searchParams;

  const upcoming =
    searchParams.upcoming === 'true'
      ? true
      : searchParams.upcoming === 'false'
        ? false
        : undefined;

  const success =
    searchParams.success === 'true'
      ? true
      : searchParams.success === 'false'
        ? false
        : undefined;

  return {
    name,
    upcoming,
    success,
    dateFrom,
    dateTo,
    sortBy: parseSortOption(sortBy),
  };
}
