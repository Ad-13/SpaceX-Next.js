import { SpaceXQueryPayload } from '@/features/launches/types/launch';
import { fetcher } from './client';

export const queryLaunches = <T>(payload: SpaceXQueryPayload) =>
  fetcher<T>('/launches/query', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const getLaunchById = <T>(id: string) =>
  fetcher<T>(`/launches/${id}`);
