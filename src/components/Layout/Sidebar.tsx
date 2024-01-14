import React from 'react';
import styles from '../../App.module.scss';

export default function Sidebar() {
  return (
    <nav className={styles.headerNav}>
      <ul className={styles.headerNav__list}>
        <li className={styles.headerNav__listItem}>
          <a href='/elements' className={styles.headerNav__itemLink}>
            Elements
          </a>
        </li>
      </ul>
    </nav>
  );
}
