import { LaunchesQueryFilters, SpaceXQueryPayload } from '../types/launch';

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
    query.date_utc = {};

    if (filters.dateFrom) {
      (query.date_utc as Record<string, string>).$gte = filters.dateFrom;
    }

    if (filters.dateTo) {
      (query.date_utc as Record<string, string>).$lte = filters.dateTo;
    }
  }

  return {
    query,
    options: {
      page,
      limit,
      sort: { date_utc: -1 },
    },
  };
}
