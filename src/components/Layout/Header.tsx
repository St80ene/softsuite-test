import { Logo } from '../../assets/icons';
import styles from '../../App.module.scss';
import Profile from '../../assets/images/profile.png'

export default function Header() {
  return (
    <div className={styles.header}>
      <div>
        <Logo />
      </div>
      <div>
        <img src={Profile} alt='Profile avatar' />
      </div>

      {/* <nav>
        <ul>
          <li>
            <a href='#'>
              <img src={Profile} alt='Profile avatar' />
            </a>
          </li>
          <li>
            <a href='#'>About</a>
          </li>
          <li>
            <a href='#'>Services</a>
          </li>
          <li>
            <a href='#'>Contact</a>
          </li>
        </ul>
      </nav> */}
    </div>
  );
}
