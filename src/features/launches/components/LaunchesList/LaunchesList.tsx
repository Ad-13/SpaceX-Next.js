"use client";

import { useLaunchesInfiniteQuery } from "../../hooks/useLaunchesInfiniteQuery";
import { LaunchesQueryFilters } from "../../types/launch";
import LaunchCard from "../LaunchCard";
import Button from "@/shared/ui/Button";
import Skeleton from "@/shared/ui/Skeleton";
import Spinner from "@/shared/ui/Spinner";
import classNames from "classnames";
import { useFavorites } from "@/features/favorites/hooks/useFavorites";
import styles from "./LaunchesList.module.scss";

interface IProps {
  filters: LaunchesQueryFilters;
}

export default function LaunchesList({ filters }: IProps) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    error,
    isFetchingNextPage,
  } = useLaunchesInfiniteQuery(filters);

  const { isFavorite, toggleFavorite, favoritesCount } = useFavorites();

  if (isLoading) {
    return (
      <div className={styles.list}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={styles.skeletonCard}>
            <Skeleton width={80} height={80} borderRadius="var(--radius-md)" />
            <div className={styles.skeletonContent}>
              <Skeleton width="60%" height={24} />
              <Skeleton width="40%" height={16} />
              <Skeleton width="100%" height={16} />
              <Skeleton width="100%" height={16} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p className={styles.errorTitle}>Failed to load launches</p>
        <p className={styles.errorMessage}>{error.message}</p>
        <Button onClick={() => window.location.reload()} variant="secondary">
          Retry
        </Button>
      </div>
    );
  }

  const launches = data?.pages.flatMap((page) => page.docs) ?? [];

  if (launches.length === 0) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyTitle}>No launches found</p>
        <p className={styles.emptyMessage}>
          Try adjusting your filters or search query.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <p
        className={classNames(styles.favoritesCount, {
          [styles.active]: favoritesCount > 0,
        })}
        aria-live="polite"
        role="status"
      >
        ★ {favoritesCount} saved {favoritesCount === 1 ? "launch" : "launches"}
      </p>

      <ul className={styles.list} aria-label="Launches">
        {launches.map((launch) => (
          <li key={launch.id}>
            <LaunchCard
              onToggle={toggleFavorite}
              isFavorite={isFavorite(launch.id)}
              launch={launch}
            />
          </li>
        ))}
      </ul>

      {hasNextPage && (
        <div className={styles.loadMore}>
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            isLoading={isFetchingNextPage}
            variant="secondary"
            size="lg"
          >
            {isFetchingNextPage ? <Spinner /> : "Load More"}
          </Button>
        </div>
      )}
    </div>
  );
}
