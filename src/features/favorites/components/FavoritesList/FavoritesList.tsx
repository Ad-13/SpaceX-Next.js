"use client";

import Link from "next/link";
import LaunchCard from "@/features/launches/components/LaunchCard";
import FavoriteButton from "@/features/favorites/components/FavoriteButton";
import Button from "@/shared/ui/Button";
import styles from "./FavoritesList.module.scss";
import { useFavorites } from "../../hooks/useFavorites";

export default function FavoritesList() {
  const { favorites, favoritesCount, isFavorite, toggleFavorite } =
    useFavorites();

  if (!favoritesCount) {
    return (
      <div className={styles.empty} role="status">
        <span className={styles.emptyIcon} aria-hidden="true">
          ☆
        </span>
        <p className={styles.emptyTitle}>No favorites yet</p>
        <p className={styles.emptyMessage}>
          Star any launch to save it here for quick access.
        </p>
        <Link href="/launches">
          <Button variant="secondary">Browse launches</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <p className={styles.count} aria-live="polite" role="status">
        {favoritesCount} saved {favoritesCount === 1 ? "launch" : "launches"}
      </p>

      <ul className={styles.list} aria-label="Favorite launches">
        {favorites.map((launch) => (
          <li key={launch.id}>
            <LaunchCard
              onToggle={toggleFavorite}
              isFavorite={isFavorite(launch.id)}
              launch={launch}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
