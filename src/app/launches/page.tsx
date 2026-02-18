import { Metadata } from 'next';
import LaunchesList from '@/features/launches/components/LaunchesList';
import LaunchesFilters from '@/features/launches/components/LaunchesFilters';
import { parseFiltersFromSearchParams } from '@/features/launches/services/parseFiltersFromSearchParams';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: 'Launch List',
  description: 'List of all SpaceX launches.',
};

interface LaunchesPageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

export default async function LaunchesPage({ searchParams }: LaunchesPageProps) {
  const params = await searchParams;
  const filters = parseFiltersFromSearchParams(params);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>SpaceX Launches</h1>
      </div>

      <LaunchesFilters />

      <LaunchesList filters={filters} />
    </div>
  );
}
