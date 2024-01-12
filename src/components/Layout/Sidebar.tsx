import React from 'react';
import styles from '../../App.module.scss';

export default function Sidebar() {
  console.log(styles);

  return (
    <nav className={styles.headerNav}>
      <ul className={styles.headerNav__list}>
        <li className={styles.headerNav__listItem}>
          <a href='#' className={styles.headerNav__itemLink}>
            Services
          </a>
        </li>
        <li>
          <a href='#' className={styles.headerNav__itemLink}>
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
}
