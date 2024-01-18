import React from 'react';
import styles from '../../App.module.scss';
import { Modal } from 'antd';
import { Tab1 } from '../../pages/Elements/elementForm';
import inputStyles from './input.module.scss';

interface ModalProps {
  createModal: boolean;
  handleOk: (...args: any[]) => void;
  handleCancel: (...args: any[]) => void;
}

export default function FormModal({
  createModal,
  handleOk,
  handleCancel,
}: ModalProps) {
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
        {/* <Tab1 /> */}
        <div className={styles.modalContent}>
          <div className={inputStyles.inputWrapper__buttonWrapper}>
            <button
              className={`${inputStyles.inputWrapper__button} ${inputStyles.inputWrapper__cancelButton}`}
            >
              Cancel
            </button>
            <button
              className={`${inputStyles.inputWrapper__button} ${inputStyles.inputWrapper__nextButton}`}
            >
              Next
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
