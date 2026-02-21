"use client";

import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";
import { Launch } from "../../types/launch";
import Skeleton from "@/shared/ui/Skeleton";
import Button from "@/shared/ui/Button";
import {
  useLaunchQuery,
  useRocketQuery,
  useLaunchpadQuery,
} from "../../hooks/launchDetailQueries";
import styles from "./LaunchDetail.module.scss";
import FavoriteButton from "@/features/favorites/components/FavoriteButton/FavoriteButton";
import { useFavorites } from "@/features/favorites/hooks/useFavorites";

interface IProps {
  id: string;
  initialLaunch?: Launch;
}

export default function LaunchDetail({ id, initialLaunch }: IProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const {
    data: launch,
    isLoading: launchLoading,
    error,
  } = useLaunchQuery(id, { initialData: initialLaunch });
  const { data: rocket, isLoading: rocketLoading } = useRocketQuery(
    launch?.rocket,
  );
  const { data: launchpad, isLoading: launchpadLoading } = useLaunchpadQuery(
    launch?.launchpad,
  );
  const isLoading = launchLoading || rocketLoading || launchpadLoading;

  if (isLoading) {
    return (
      <div className={styles.page}>
        <div className={styles.hero}>
          <Skeleton width={140} height={140} borderRadius="var(--radius-lg)" />
          <div className={styles.heroContent}>
            <Skeleton width="50%" height={36} marginBottom={16} />
            <Skeleton width="30%" height={16} marginBottom={16} />
            <Skeleton width="100%" height={16} marginBottom={30} />
            <Skeleton width="90%" height={16} marginBottom={16} />
          </div>
        </div>
        <div className={styles.grid}>
          {[0, 1].map((i) => (
            <div key={i} className={styles.infoCardSkeleton}>
              <Skeleton width="40%" height={12} marginBottom={16} />
              <Skeleton width="60%" height={24} marginBottom={16} />
              <Skeleton width="100%" height={30} marginBottom={16} />
              <Skeleton width="100%" height={14} marginBottom={16} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !launch) {
    return (
      <div className={styles.page}>
        <div className={styles.errorState}>
          <p className={styles.errorTitle}>Launch not found</p>
          <p className={styles.errorMessage}>
            {error?.message ?? "This launch does not exist or failed to load."}
          </p>
          <Button variant="secondary">
            <Link href="/launches">← Back to launches</Link>
          </Button>
        </div>
      </div>
    );
  }

  const statusVariant =
    launch.success === null
      ? "upcoming"
      : launch.success
        ? "success"
        : "failure";
  const patch = launch.links.patch?.large ?? launch.links.patch?.small;
  const flickrImages = launch.links.flickr.original;

  return (
    <div className={styles.page}>
      <Link href="/launches" className={styles.back}>
        ← All Launches
      </Link>

      <section className={styles.hero} aria-label="Launch overview">
        {patch ? (
          <Image
            src={patch}
            alt={`${launch.name} mission patch`}
            width={140}
            height={140}
            className={styles.patch}
            priority
          />
        ) : (
          <div className={styles.patchPlaceholder} aria-hidden="true">
            🚀
          </div>
        )}

        <div className={styles.heroContent}>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>{launch.name}</h1>
            <span className={classNames(styles.badge, styles[statusVariant])}>
              {statusVariant}
            </span>
            <FavoriteButton
              launch={launch}
              isFavorite={isFavorite(launch.id)}
              onToggle={toggleFavorite}
            />
          </div>

          <time dateTime={launch.date_utc} className={styles.date}>
            {new Date(launch.date_utc).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              timeZoneName: "short",
            })}
          </time>

          {launch.details && <p className={styles.details}>{launch.details}</p>}

          <div className={styles.links}>
            {launch.links.webcast && (
              <a
                href={launch.links.webcast}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.linkBtn}
                aria-label="Watch webcast (opens in new tab)"
              >
                🎥 Webcast
              </a>
            )}
            {launch.links.wikipedia && (
              <a
                href={launch.links.wikipedia}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.linkBtn}
                aria-label="Read on Wikipedia (opens in new tab)"
              >
                📖 Wikipedia
              </a>
            )}
          </div>
        </div>
      </section>

      <div className={styles.grid}>
        <section aria-label="Rocket information">
          {rocketLoading ? (
            <div className={styles.infoCardSkeleton}>
              <Skeleton width="40%" height={12} />
              <Skeleton width="60%" height={24} />
              <Skeleton width="100%" height={14} />
              <Skeleton width="100%" height={14} />
            </div>
          ) : rocket ? (
            <div className={styles.infoCard}>
              <p className={styles.infoTitle}>Rocket</p>
              <p className={styles.infoName}>{rocket.name}</p>
              {rocket.description && (
                <p className={styles.infoDescription}>{rocket.description}</p>
              )}
              <dl className={styles.infoStats}>
                {rocket.success_rate_pct !== null && (
                  <div className={styles.stat}>
                    <dt className={styles.statLabel}>Success rate</dt>
                    <dd className={styles.statValue}>
                      {rocket.success_rate_pct}%
                    </dd>
                  </div>
                )}
                {rocket.first_flight && (
                  <div className={styles.stat}>
                    <dt className={styles.statLabel}>First flight</dt>
                    <dd className={styles.statValue}>{rocket.first_flight}</dd>
                  </div>
                )}
                {rocket.height.meters !== null && (
                  <div className={styles.stat}>
                    <dt className={styles.statLabel}>Height</dt>
                    <dd className={styles.statValue}>
                      {rocket.height.meters} m
                    </dd>
                  </div>
                )}
                {rocket.mass.kg !== null && (
                  <div className={styles.stat}>
                    <dt className={styles.statLabel}>Mass</dt>
                    <dd className={styles.statValue}>
                      {rocket.mass.kg.toLocaleString()} kg
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          ) : null}
        </section>

        <section aria-label="Launchpad information">
          {launchpadLoading ? (
            <div className={styles.infoCardSkeleton}>
              <Skeleton width="40%" height={12} />
              <Skeleton width="60%" height={24} />
              <Skeleton width="100%" height={14} />
              <Skeleton width="100%" height={14} />
            </div>
          ) : launchpad ? (
            <div className={styles.infoCard}>
              <p className={styles.infoTitle}>Launchpad</p>
              <p className={styles.infoName}>{launchpad.full_name}</p>
              {launchpad.details && (
                <p className={styles.infoDescription}>{launchpad.details}</p>
              )}
              <dl className={styles.infoStats}>
                <div className={styles.stat}>
                  <dt className={styles.statLabel}>Location</dt>
                  <dd className={styles.statValue}>
                    {launchpad.locality}, {launchpad.region}
                  </dd>
                </div>
                <div className={styles.stat}>
                  <dt className={styles.statLabel}>Status</dt>
                  <dd
                    className={styles.statValue}
                    style={{ textTransform: "capitalize" }}
                  >
                    {launchpad.status}
                  </dd>
                </div>
                <div className={styles.stat}>
                  <dt className={styles.statLabel}>Launches</dt>
                  <dd className={styles.statValue}>
                    {launchpad.launch_successes} / {launchpad.launch_attempts}{" "}
                    successful
                  </dd>
                </div>
              </dl>
            </div>
          ) : null}
        </section>
      </div>

      {flickrImages.length > 0 && (
        <section
          className={styles.gallerySection}
          aria-label="Launch photo gallery"
        >
          <h2 className={styles.sectionTitle}>Photos</h2>
          <div className={styles.gallery}>
            {flickrImages.map((src, index) => (
              <a
                key={src}
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.galleryItem}
                aria-label={`Launch photo ${index + 1} of ${flickrImages.length} (opens in new tab)`}
              >
                <Image
                  src={src}
                  alt={`${launch.name} launch photo ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
