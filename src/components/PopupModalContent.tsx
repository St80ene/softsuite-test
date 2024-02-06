import React, { memo } from 'react';
import styles from '../App.module.scss';
import { Popconfirm } from 'antd';

interface Items {
  title: string;
  Icon: any;
  onClick?: (...args: any[]) => void;
  data?: any;
  onConfirm?: (...args: any[]) => void;
  onCancel?: (...args: any[]) => void;
}

const PopupModalContent = ({ listItems }: { listItems: Items[] }) => {
  return (
    <div className={styles.popupModal}>
      {listItems.map(({ title, Icon, onConfirm, onClick, onCancel }, index) => (
        <div
          className={styles.popupModalContent}
          key={index}
          onClick={(...args) => onClick?.(...args)}
        >
          {title.toLowerCase().includes('delete') ? (
            <Popconfirm
              title='Delete the task'
              description='Are you sure to delete this task?'
              onConfirm={onConfirm}
              onCancel={onCancel}
              okText='Yes'
              cancelText='No'
            >
              <div>
                <Icon />
                <p>{title}</p>
              </div>
            </Popconfirm>
          ) : (
            <>
              <Icon />
              <p>{title}</p>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default memo(PopupModalContent);
