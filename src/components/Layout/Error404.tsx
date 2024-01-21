import React from 'react';
import styles from '../../App.module.scss';
import { ErrorIcon } from '../../assets/icons';

const Error404 = () => {
  const previousPageHandler = () => window.history.back();
  return (
    <div className={styles.container}>
      <h2 className={styles.container__heading}>Page Not Found</h2>
      <ErrorIcon />
      <button
        onClick={previousPageHandler}
        className={styles.container__linkButton}
      >
        Back
      </button>
    </div>
  );
};

export default Error404;
