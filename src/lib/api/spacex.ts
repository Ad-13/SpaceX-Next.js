import { SpaceXQueryPayload } from '@/features/launches/types/launch';
import { fetcher } from './client';

export const queryLaunches = <T>(payload: SpaceXQueryPayload) =>
  fetcher<T>('/launches/query', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const getLaunchById = <T>(id: string) =>
  fetcher<T>(`/launches/${id}`);

export const getRocketById = <T>(id: string) =>
  fetcher<T>(`/rockets/${id}`);

export const getLaunchpadById = <T>(id: string) =>
  fetcher<T>(`/launchpads/${id}`);
