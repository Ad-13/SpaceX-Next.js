import { z } from 'zod';
import { SORT_OPTIONS, BOOL_ALL_OPTIONS, DEFAULT_FILTER_VALUES } from '@/features/launches/types/filters';

export const launchesFiltersSchema = z.object({
  name:      z.string().optional(),
  upcoming:  z.enum(BOOL_ALL_OPTIONS).optional(),
  success:   z.enum(BOOL_ALL_OPTIONS).optional(),
  dateFrom:  z.string().optional(),
  dateTo:    z.string().optional(),
  sortBy:    z.enum(SORT_OPTIONS).optional(),
});

export type LaunchesFiltersFormValues = z.infer<typeof launchesFiltersSchema>;

export { DEFAULT_FILTER_VALUES };
