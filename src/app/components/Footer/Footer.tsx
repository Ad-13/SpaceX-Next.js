import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.inner}>
        <p className={styles.text}>
          Data provided by{' '}
          <a
            href="https://github.com/r-spacex/SpaceX-API"
            target="_blank"
            rel="noopener noreferrer"
          >
            SpaceX API
          </a>
        </p>
      </div>
    </footer>
  );
}
