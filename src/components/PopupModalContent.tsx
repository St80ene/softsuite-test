import React from 'react';
import styles from '../App.module.scss';

interface Items {
  title: string;
  Icon: any;
  onClick?: (...args: any[]) => void;
  data?: any;
}

const PopupModalContent = ({ listItems }: { listItems: Items[] }) => {
  return (
    <div className={styles.popupModal}>
      {listItems.map(({ title, Icon, onClick }, index) => (
        <div
          className={styles.popupModalContent}
          key={index}
          onClick={(...args) => onClick?.(...args)}
        >
          <Icon />
          <p>{title}</p>
        </div>
      ))}
    </div>
  );
};

export default PopupModalContent;
