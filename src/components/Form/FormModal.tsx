import React, { memo, useState } from 'react';
import { Modal } from 'antd';
import { Tab1, Tab2 } from '../../pages/Elements/elementForm';
import inputStyles from './input.module.scss';
import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';

interface ModalProps {
  createModal: boolean;
  handleOk: (...args: any[]) => void;
  handleCancel: (...args: any[]) => void;
  onSubmit: (...args: any[]) => void;
  register: any;
  errors: any;
  trigger: any;
  getValues: UseFormGetValues<any>;
  setValue: UseFormSetValue<any>;
}

const tabList = [Tab1, Tab2];

const FormModal = ({
  createModal,
  handleOk,
  handleCancel,
  register,
  errors,
  trigger,
  getValues,
  onSubmit,
  setValue,
}: ModalProps) => {
  const [currentTab, setState] = useState(0);

  const Tab = tabList[currentTab];

  const handleBack = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (currentTab === 1 && currentTab > 0) {
      setState(currentTab - 1);

      const triggerResultSecond = await trigger([
        'effectiveStartDate',
        'effectiveEndDate',
        'processingType',
        'payFrequency',
        'selectedMonths',
        'prorate',
        'status',
      ]);

      console.log('triggerResultSecond', triggerResultSecond, getValues());

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

      if (triggerResult) {
        setState(currentTab + 1);
      }

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
      <form onSubmit={onSubmit}>
        <Tab register={register} errors={errors} setValue={setValue} />
        <div className={inputStyles.modalContent}>
          <div className={inputStyles.inputWrapper__buttonWrapper}>
            <button
              type='submit'
              className={`${inputStyles.inputWrapper__button} ${inputStyles.inputWrapper__cancelButton}`}
              onClick={handleBack}
            >
              {currentTab === 1 && currentTab > 0 ? 'Back' : 'Cancel'}
            </button>

            <button
              type='submit'
              className={`${inputStyles.inputWrapper__button} ${inputStyles.inputWrapper__nextButton}`}
              onClick={handleNext}
            >
              {currentTab === 1 && currentTab > 0 ? 'Submit' : 'Next'}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default memo(FormModal);
