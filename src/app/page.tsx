import styles from "./page.module.scss";

export default function HomePage() {
  return (
    <div className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>Explore SpaceX</h1>
        </div>

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
