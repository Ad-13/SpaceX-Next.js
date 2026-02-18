import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { queryLaunches } from '@/lib/api/spacex';
import { LaunchesResponse, LaunchesQueryFilters } from '../types/launch';
import { buildSpaceXQuery } from './buildSpaceXQuery';
import { LAUNCHES_QUERY } from './queryKeys';

export function useLaunchesInfiniteQuery(filters: LaunchesQueryFilters) {
  return useInfiniteQuery<
    LaunchesResponse,
    Error,
    InfiniteData<LaunchesResponse, number>,
    ReturnType<typeof LAUNCHES_QUERY.list>,
    number
  >({
    queryKey: LAUNCHES_QUERY.list(filters),
    queryFn: ({ pageParam }) => {
      const payload = buildSpaceXQuery(filters, pageParam, 10);
      return queryLaunches<LaunchesResponse>(payload);
    },
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.nextPage : undefined,
    initialPageParam: 1,
  });
}
