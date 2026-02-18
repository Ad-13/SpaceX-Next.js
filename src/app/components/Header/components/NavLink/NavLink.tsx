'use client'

import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./NavLink.module.scss";

interface IProps {
  href: string;
  label: string;
}

export default function NavLink({ href, label }: IProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li key={href}>
      <Link
        href={href}
        className={styles.navLink}
        aria-current={isActive ? "page" : undefined}
        data-active={isActive}
      >
        {label}
      </Link>
    </li>
  );
}
