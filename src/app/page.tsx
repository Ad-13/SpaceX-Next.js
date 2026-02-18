import Link from 'next/link';
import styles from './page.module.scss';

export default function HomePage() {
  return (
    <div className={styles.hero}>
      <div className={styles.container}>
        {/* Hero content */}
        <div className={styles.content}>
          <h1 className={styles.title}>
            Explore SpaceX <span className={styles.highlight}>Launches</span>
          </h1>
          <p className={styles.subtitle}>
            Browse launch history, mission details, rockets, and launchpads from the SpaceX API. Track your favorite missions and explore the future of space exploration.
          </p>
          <div className={styles.actions}>
            <Link href="/launches" className={styles.primaryButton}>
              View All Launches
            </Link>
            <Link href="/favorites" className={styles.secondaryButton}>
              My Favorites
            </Link>
          </div>
        </div>

        {/* Hero visual */}
        <div className={styles.imageWrapper}>
          <div className={styles.imagePlaceholder}>
            <span className={styles.rocket}>🚀</span>
            <span className={styles.planet}>🪐</span>
            <span className={styles.star}>✨</span>
          </div>
        </div>
      </div>
    </div>
  );
}
