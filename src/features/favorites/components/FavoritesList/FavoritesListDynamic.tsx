'use client';

import dynamic from 'next/dynamic';

const FavoritesList = dynamic(
  () => import('./FavoritesList'),
  { ssr: false }
);

export default function FavoritesListDynamic() {
  return <FavoritesList />;
}
