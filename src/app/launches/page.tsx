import LaunchesList from '@/features/launches/components/LaunchesList';
import styles from './page.module.scss';

export default function LaunchesPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>SpaceX Launches</h1>
      </div>

      <LaunchesList filters={{}} />
    </div>
  );
}
