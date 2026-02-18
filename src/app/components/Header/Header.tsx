import Link from "next/link";
import styles from "./Header.module.scss";
import NavLink from "./components/NavLink";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/launches", label: "Launches" },
  { href: "/favorites", label: "Favorites" },
] as const;

export default function Header() {
  return (
    <header className={styles.header} role="banner">
      <div className={styles.inner}>
        {/* Logo / Brand */}
        <Link
          href="/"
          className={styles.logo}
          aria-label="SpaceX Explorer — home"
        >
          <span className={styles.logoIcon} aria-hidden="true">
            🚀
          </span>
          <span className={styles.logoText}>SpaceX Explorer</span>
        </Link>

        {/* Navigation */}
        <nav className={styles.nav} aria-label="Main navigation">
          <ul className={styles.navList} role="list">
            {NAV_LINKS.map(({ href, label }) => (
              <NavLink key={href} href={href} label={label} />
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
