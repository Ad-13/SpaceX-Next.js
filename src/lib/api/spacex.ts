import { fetcher } from './client';

export const queryLaunches = <T>(payload: unknown) =>
  fetcher<T>('/launches/query', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const getLaunchById = <T>(id: string) =>
  fetcher<T>(`/launches/${id}`);
