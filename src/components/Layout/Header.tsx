import { Logo, Notification } from '../../assets/icons';
import styles from '../../App.module.scss';
import Profile from '../../assets/images/profile.png';

export default function Header() {
  return (
    <div className={styles.header}>
      <Logo className={styles.logo} />
      <div className={styles.profile}>
        <Notification />
        <img src={Profile} alt='Profile avatar' />
        <div className={styles.profileUser}>
          <p className={styles.userName}>Henry Okoro</p>
          <p className={styles.userTitle}>Payroll Manager</p>
        </div>
      </div>
    </div>
  );
}
