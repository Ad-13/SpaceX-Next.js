"use client";

import { useLaunchesInfiniteQuery } from "../../services/useLaunchesInfiniteQuery";
import { Launch } from "../../types/launch";

interface IProps {
  filters: Record<string, unknown>;
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

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading launches</p>;

  const launches: Launch[] = data?.pages.flatMap((page) => page.docs) ?? [];

  return (
    <section>
      {launches.map((launch) => (
        <div key={launch.id}>{launch.name}</div>
      ))}

      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? "Loading more..." : "Load more"}
        </button>
      )}
    </section>
  );
}
