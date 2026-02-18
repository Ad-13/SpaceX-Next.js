import { LaunchesQueryFilters } from '../types/launch';

export const LAUNCHES_QUERY = {
  list: (filters: LaunchesQueryFilters) => ['launches', filters] as const,
  detail: (id: string) => ['launch', id] as const,
};
