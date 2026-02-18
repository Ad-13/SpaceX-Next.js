import type { Metadata } from 'next';
import FavoritesListDynamic from '@/features/favorites/components/FavoritesList/FavoritesListDynamic';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: 'Favorites',
  description: 'Your saved SpaceX launches.',
};

export default function FavoritesPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Favorites</h1>
      </div>

      <FavoritesListDynamic />
    </div>
  );
}
