import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <p className={styles.text}>Data provided by SpaceX API</p>
    </footer>
  );
}
