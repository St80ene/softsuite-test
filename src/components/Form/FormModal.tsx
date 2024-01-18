import React, { useState } from 'react';
import styles from '../../App.module.scss';
import { Modal } from 'antd';
import { Tab1, Tab2 } from '../../pages/Elements/elementForm';
import inputStyles from './input.module.scss';

interface ModalProps {
  createModal: boolean;
  handleOk: (...args: any[]) => void;
  handleCancel: (...args: any[]) => void;
}

const tabList = [Tab1, Tab2];

export default function FormModal({
  createModal,
  handleOk,
  handleCancel,
}: ModalProps) {
  const [currentTab, setState] = useState(0);

  const Tab = tabList[currentTab];

  return (
    <Modal
      title='Create Element'
      open={createModal}
      onOk={handleOk}
      onCancel={handleCancel}
      width={765}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}
    >
      <form action=''>
        <Tab />
        <div className={inputStyles.modalContent}>
          <div className={inputStyles.inputWrapper__buttonWrapper}>
            <button
              className={`${inputStyles.inputWrapper__button} ${inputStyles.inputWrapper__cancelButton}`}
              onClick={(event) => {
                event.preventDefault();
                if (currentTab == 1 || currentTab > 0) {
                  setState(currentTab - 1);
                  return;
                } else {
                  handleCancel();
                  return;
                }
              }}
            >
              {currentTab == 1 || currentTab > 0 ? 'Back' : 'Cancel'}
            </button>
            <button
              className={`${inputStyles.inputWrapper__button} ${inputStyles.inputWrapper__nextButton}`}
              onClick={(event) => {
                event.preventDefault();
                if (currentTab < 1) {
                  setState(currentTab + 1);
                  return;
                }
              }}
            >
              Next
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
