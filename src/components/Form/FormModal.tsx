import React, { memo, useEffect, useMemo, useState } from 'react';
import { App, Modal } from 'antd';
import { Tab1, Tab2 } from '../../pages/Elements/elementForm';
import inputStyles from './input.module.scss';
import {
  DeepMap,
  FieldErrors,
  FieldValues,
  UseFormGetValues,
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
} from 'react-hook-form';
import Steps from '../Steps';
import moment from 'moment';
import { Inputs } from '../common/interfaces';
import axios from 'axios';

interface ModalProps {
  createModal: boolean;
  handleOk: (...args: any[]) => void;
  handleCancel: (...args: any[]) => void;
  onSubmit: (...args: any[]) => void;
  register: UseFormRegister<any>;
  errors: DeepMap<FieldValues, FieldErrors>;
  trigger: any;
  getValues: UseFormGetValues<any>;
  setValue: UseFormSetValue<any>;
  handleSubmit?: (...args: any[]) => any;
  reset: UseFormReset<Inputs>;
  refresh: (...args: any[]) => void;
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
  handleSubmit,
  reset,
  refresh,
}: ModalProps) => {
  const [{ nextBtnDisable, currentTab }, setState] = useState({
    nextBtnDisable: false,
    currentTab: 0,
  });

  const { message } = App.useApp();

  const Tab = tabList[currentTab];

  const steps = useMemo(
    () => [
      {
        title: 'Element Details',
        fields: [
          'name',
          'classificationValueId',
          'categoryValueId',
          'payRunValueId',
          'reportingName',
          'description',
        ],
      },
      {
        title: 'Additional Details',
        fields: [],
      },
    ],
    []
  );

  const handleBack = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (currentTab === 1 && currentTab > 0) {
      setState((prev) => ({ ...prev, currentTab: currentTab - 1 }));

      return;
    } else {
      handleCancel();
      reset();
      setState((prev) => ({ ...prev, currentTab: 0 }));
      return;
    }
  };

  const handleNext = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    const triggerResult = await trigger([
      'name',
      'classificationId',
      'categoryId',
      'payRunId',
      'description',
      'reportingName',
    ]);

    const triggerResultSecond = await trigger([
      'effectiveStartDate',
      'effectiveEndDate',
      'processingType',
      'payFrequency',
      'selectedMonths',
      'prorate',
      'status',
    ]);

    if (currentTab < 1) {
      if (triggerResult && currentTab >= 0 && currentTab < steps?.length - 1) {
        setState((prev) => ({
          ...prev,
          currentTab: currentTab + 1,
          nextBtnDisable: false,
        }));
      }

      return;
    }

    if (
      triggerResultSecond &&
      currentTab > 0 &&
      currentTab === steps?.length - 1
    ) {
      try {
        const {
          name,
          classificationId,
          categoryId,
          payRunId,
          description,
          processingType,
          prorate,
          reportingName,
          status,
          effectiveEndDate,
          effectiveStartDate,
          payFrequency,
        } = await getValues();

        const formattedEffectiveStartDate =
          moment(effectiveStartDate).format('DD-MM-YYYY');
        const formattedEffectiveEndDate =
          moment(effectiveEndDate).format('DD-MM-YYYY');

        const payload = {
          name,
          description,
          payRunId: parseInt(payRunId!, 10),
          //  payRunValueId: parseInt(payRunValueId!, 10),
          classificationId: parseInt(classificationId!, 10),
          //  classificationValueId: parseInt(classificationValueId!, 10),
          categoryId: parseInt(categoryId!, 10),
          //  categoryValueId: parseInt(categoryValueId!, 10),
          reportingName,
          processingType,
          status,
          prorate,
          effectiveStartDate: formattedEffectiveStartDate,
          effectiveEndDate: formattedEffectiveEndDate,
          //  selectedMonths,
          payFrequency,
          modifiedBy: 'Etiene Essenoh',
        };

        await axios.post(
          'https://650af6bedfd73d1fab094cf7.mockapi.io/elements',
          payload
        );

        message.success('Element has been created successfully');

        refresh();
      } catch (error) {
        console.log('error', error);
        // @ts-ignore
        message.error(error.message);
      }

      handleCancel();
      reset();
      setState((prev) => ({
        ...prev,
        currentTab: 0,
        nextBtnDisable: false,
      }));
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
      <form onSubmit={handleSubmit?.(onSubmit)}>
        <div className={inputStyles.stepContainer}>
          {steps.map((item, index) => (
            <Steps
              key={`step-${index}`}
              title={item?.title}
              index={index}
              currentIndex={currentTab}
              length={steps?.length}
              active={currentTab >= index}
            />
          ))}
        </div>
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
              disabled={nextBtnDisable}
              className={`${inputStyles.inputWrapper__button} ${
                inputStyles.inputWrapper__nextButton
              } ${nextBtnDisable && inputStyles.inputWrapper__nextBtnDisabled}`}
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
