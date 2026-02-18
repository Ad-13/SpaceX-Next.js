import { useQuery } from '@tanstack/react-query';
import { getLaunchById, getRocketById, getLaunchpadById } from '@/lib/api/spacex';
import { Launch } from '../types/launch';
import { LAUNCHES_QUERY } from '../services/queryKeys';
import { Launchpad } from '../types/launchpad';
import { Rocket } from '../types/rocket';

const MODULE_LOAD_TIME = Date.now();

interface UseLaunchQueryOptions {
  initialData?: Launch;
}

export function useLaunchQuery(id: string, { initialData }: UseLaunchQueryOptions = {}) {
  return useQuery<Launch, Error>({
    queryKey: LAUNCHES_QUERY.detail(id),
    queryFn: () => getLaunchById<Launch>(id),
    initialData,
    initialDataUpdatedAt: initialData ? MODULE_LOAD_TIME : undefined,
    staleTime: 5 * 60_000,
  });
}

export function useRocketQuery(id: string | undefined) {
  return useQuery<Rocket, Error>({
    queryKey: ['rocket', id],
    queryFn: () => getRocketById<Rocket>(id!),
    enabled: !!id,
    staleTime: 60 * 60_000,
  });
}

export function useLaunchpadQuery(id: string | undefined) {
  return useQuery<Launchpad, Error>({
    queryKey: ['launchpad', id],
    queryFn: () => getLaunchpadById<Launchpad>(id!),
    enabled: !!id,
    staleTime: 60 * 60_000,
  });
}