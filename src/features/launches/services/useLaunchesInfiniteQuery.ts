import { useInfiniteQuery } from '@tanstack/react-query';
import { queryLaunches } from '@/lib/api/spacex';
import { LaunchesResponse, LaunchesQueryFilters } from '../types/launch';
import { LAUNCHES_QUERY } from './queryKeys';

export function useLaunchesInfiniteQuery(filters: LaunchesQueryFilters) { // ???
  return useInfiniteQuery<LaunchesResponse, Error>({
    queryKey: LAUNCHES_QUERY.list(filters),
    queryFn: ({ pageParam = 1 }) =>
      queryLaunches<LaunchesResponse>({
        query: filters,
        options: {
          page: pageParam,
          limit: 10,
        },
      }),
    getNextPageParam: lastPage =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined, // ???
    initialPageParam: 1,
  });
}
