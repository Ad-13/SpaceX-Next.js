import { LaunchesQueryFilters, SortOption, SpaceXQueryPayload } from '../types/launch';

// Exhaustive map — TypeScript will error if a new SortOption is added but not handled here
const SORT_MAP: Record<SortOption, Record<string, 1 | -1>> = {
  'date-desc': { date_utc: -1 },
  'date-asc': { date_utc: 1 },
  'name-asc': { name: 1 },
  'name-desc': { name: -1 },
};

export function buildSpaceXQuery(
  filters: LaunchesQueryFilters,
  page: number,
  limit: number = 10
): SpaceXQueryPayload {
  const query: Record<string, unknown> = {};

  if (filters.upcoming !== undefined) {
    query.upcoming = filters.upcoming;
  }

  if (filters.success !== undefined) {
    query.success = filters.success;
  }

  if (filters.name) {
    query.name = {
      $regex: filters.name,
      $options: 'i',
    };
  }

  if (filters.dateFrom || filters.dateTo) {
    const dateFilter: Record<string, string> = {};
    if (filters.dateFrom) dateFilter.$gte = filters.dateFrom;
    if (filters.dateTo) dateFilter.$lte = filters.dateTo;
    query.date_utc = dateFilter;
  }

  return {
    query,
    options: {
      page,
      limit,
      sort: SORT_MAP[filters.sortBy ?? 'date-desc'],
    },
  };
}
