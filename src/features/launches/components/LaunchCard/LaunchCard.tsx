import Link from 'next/link';
import Image from 'next/image';
import classNames from 'classnames';
import { Launch } from '../../types/launch';
import styles from './LaunchCard.module.scss';

interface LaunchCardProps {
  launch: Launch;
}

export default function LaunchCard({ launch }: LaunchCardProps) {
  const statusVariant = launch.success === null
    ? 'upcoming'
    : launch.success
    ? 'success'
    : 'failure';

  const patch = launch.links?.patch?.small;

  return (
    <Link href={`/launches/${launch.id}`} className={styles.card}>
      <article className={styles.inner}>
        <div className={styles.patchWrapper}>
          {patch ? (
            <Image
              src={patch}
              alt={`${launch.name} mission patch`}
              className={styles.patch}
              width={100}
              height={100}
            />
          ) : (
            <div className={styles.patchPlaceholder}>
              <span className={styles.rocketIcon}>🚀</span>
            </div>
          )}
        </div>

        <div className={styles.content}>
          <div className={styles.header}>
            <h3 className={styles.name}>{launch.name}</h3>
            <span
              className={classNames(styles.badge, styles[statusVariant])}
            >
              {statusVariant}
            </span>
          </div>

          <time
            dateTime={launch.date_utc}
            className={styles.date}
          >
            {new Date(launch.date_utc).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </time>

          {launch.details && (
            <p className={styles.details}>
              {launch.details.length > 150
                ? `${launch.details.slice(0, 150)}...`
                : launch.details}
            </p>
          )}

          {/* Additional info */}
          <div className={styles.footer}>
            {launch.links.wikipedia && (
              <span className={styles.link}>📖 Wikipedia</span>
            )}
            {launch.links.webcast && (
              <span className={styles.link}>🎥 Webcast</span>
            )}
            {launch.links.flickr.original.length > 0 && (
              <span className={styles.link}>
                📷 {launch.links.flickr.original.length} photos
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
