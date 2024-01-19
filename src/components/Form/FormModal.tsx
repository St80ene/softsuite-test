import React, { useState } from 'react';
import { Modal } from 'antd';
import { Tab1, Tab2 } from '../../pages/Elements/elementForm';
import inputStyles from './input.module.scss';

interface ModalProps {
  createModal: boolean;
  handleOk: (...args: any[]) => void;
  handleCancel: (...args: any[]) => void;
  register: any;
  errors: any;
  trigger: any;
  getValues: any;
}

const tabList = [Tab1, Tab2];

export default function FormModal({
  createModal,
  handleOk,
  handleCancel,
  register,
  errors,
  trigger,
  getValues,
}: ModalProps) {
  const [currentTab, setState] = useState(0);

  const Tab = tabList[currentTab];

  const handleBack = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (currentTab == 1 || currentTab > 0) {
      setState(currentTab - 1);

      //  const triggerResultSecond = trigger([
      //    'effectiveStartDate',
      //    'effectiveEndDate',
      //    'processingType',
      //    'payFrequency',
      //    'selectedMonths',
      //    'prorate',
      //  ]);

      return;
    } else {
      handleCancel();
      setState(0);
      return;
    }
  };

  const handleNext = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (currentTab < 1) {
      const triggerResult = await trigger([
        'name',
        'classification',
        'category',
        'payrun',
        'description',
        'reportingName',
      ]);
      console.log('triggerResult', triggerResult, getValues());
      setState(currentTab + 1);
      return;
    }
  };

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
        <Tab register={register} errors={errors} />
        <div className={inputStyles.modalContent}>
          <div className={inputStyles.inputWrapper__buttonWrapper}>
            <button
              className={`${inputStyles.inputWrapper__button} ${inputStyles.inputWrapper__cancelButton}`}
              onClick={handleBack}
            >
              {currentTab == 1 || currentTab > 0 ? 'Back' : 'Cancel'}
            </button>

            <button
              className={`${inputStyles.inputWrapper__button} ${inputStyles.inputWrapper__nextButton}`}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
