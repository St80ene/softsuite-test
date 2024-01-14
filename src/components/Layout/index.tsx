import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import styles from '../../App.module.scss';

export default function Layout() {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.content}>
        <Sidebar />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
