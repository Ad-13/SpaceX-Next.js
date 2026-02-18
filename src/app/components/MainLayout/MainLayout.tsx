import { PropsWithChildren } from 'react';

import Header from "../Header";
import Footer from "../Footer";

import styles from "./MainLayout.module.scss";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main} id="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
}
