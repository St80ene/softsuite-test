import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../App.module.scss';

const Home = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.container__heading}>This is the Home Page</h2>
      <span className={styles.container__heading}>Thanks for coming</span>
      <span className={styles.container__heading}>Page Not Ready</span>
      <p className={styles.container__message}>
        We're still working on this page. Please visit the{' '}
        <Link to='/elements' className={styles.container__link}>
          <button className={styles.container__linkButton}>
            Elements page
          </button>
        </Link>{' '}
        in the meantime.
      </p>
    </div>
  );
};

export default Home;
