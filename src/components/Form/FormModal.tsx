import React, { memo, useEffect, useMemo, useState } from 'react';
import { Modal } from 'antd';
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
import { request } from '../../utils/request';
import moment from 'moment';
import { Inputs } from '../common/interfaces';
import { usePostElementMutation } from '../../redux/dataSlice';

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
  // defaultValues?: { [key: string]: any };
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
}: // defaultValues = {},
ModalProps) => {
  const [{ nextBtnDisable, currentTab }, setState] = useState({
    nextBtnDisable: false,
    currentTab: 0,
  });

  const Tab = tabList[currentTab];

  const steps = useMemo(
    () => [
      {
        title: 'Element Details',
        //  content: <ElementDetails FormItem={FormItem} />,
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
        //  content: <AdditionalDetails FormItem={FormItem} />,
        fields: [],
      },
    ],
    []
  );

  // const onFinish = (values) => {
  //   const {
  //     name,
  //     classificationValueId,
  //     categoryValueId,
  //     classificationId,
  //     categoryId,
  //     payRunValueId,
  //     payRunId,
  //     status,
  //     description,
  //     reportingName,
  //   } = element;
  //   const {
  //     effectiveStartDate,
  //     effectiveEndDate,
  //     processingType,
  //     payFrequency,
  //     selectedMonths,
  //     prorate,
  //   } = values;

  //   const formattedEffectiveStartDate =
  //     moment(effectiveStartDate).format('DD-MM-YYYY');
  //   const formattedEffectiveEndDate =
  //     moment(effectiveEndDate).format('DD-MM-YYYY');

  //   const payload = {
  //     name,
  //     description,
  //     payRunId: parseInt(payRunId!, 10),
  //     payRunValueId: parseInt(payRunValueId!, 10),
  //     classificationId: parseInt(classificationId!, 10),
  //     classificationValueId: parseInt(classificationValueId!, 10),
  //     categoryId: parseInt(categoryId!, 10),
  //     categoryValueId: parseInt(categoryValueId!, 10),
  //     reportingName,
  //     processingType,
  //     status,
  //     prorate,
  //     effectiveStartDate: formattedEffectiveStartDate,
  //     effectiveEndDate: formattedEffectiveEndDate,
  //     selectedMonths,
  //     payFrequency,
  //     modifiedBy: 'Etiene Essenoh',
  //   };

  //   // dispatch(toggleLoading(true));

  //   switch (mode) {
  //     case Mode.create:
  //       request(
  //         'https://650af6bedfd73d1fab094cf7.mockapi.io/elements',
  //         'POST',
  //         payload
  //       )
  //         .then((response) => {
  //           dispatch(addNewElement(response.data));
  //           setCurrentTab(0);
  //           handleCancel();
  //           eventBus.emit('notification-message', {
  //             title: 'Element has been created successfully',
  //           });
  //         })
  //         .catch(() => {
  //           message.error('Error Occured Creating Element');
  //         })
  //         .finally(() => {
  //           dispatch(toggleLoading(false));
  //         });
  //       break;

  //     case Mode.edit:
  //       request(
  //         `https://650af6bedfd73d1fab094cf7.mockapi.io/elements/${element.id}`,
  //         'PUT',
  //         payload
  //       )
  //         .then((response) => {
  //           dispatch(
  //             replaceElement({ id: element.id!, updatedElement: response.data })
  //           );
  //           setCurrentTab(0);
  //           handleCancel();
  //           eventBus.emit('notification-message', {
  //             title: 'Element has been updated successfully',
  //           });
  //         })
  //         .catch(() => {
  //           message.error('Error Occured Creating Element');
  //         })
  //         .finally(() => {
  //           dispatch(toggleLoading(false));
  //         });
  //       break;

  //     default:
  //       break;
  //   }
  // };

  // const hasMoreTabs = useMemo(
  //   () => Boolean(steps.length - (currentTab + 1)),
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [currentTab]
  // );

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

    // if (hasMoreTabs) {
    //   //  dispatch(updateSlice(form.getFieldsValue()));
    //   setState(currentTab - 1);
    // } else {
    //   //  form.submit();
    // }
  };

  const handleNext = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    const triggerResult = await trigger([
      'name',
      'classification',
      'category',
      'payrun',
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
          classification,
          category,
          payrun,
          description,
          processingType,
          prorate,
          reportingName,
          status,
          modifiedBy,
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
          //  payRunId: parseInt(payRunId!, 10),
          //  payRunValueId: parseInt(payRunValueId!, 10),
          //  classificationId: parseInt(classificationId!, 10),
          //  classificationValueId: parseInt(classificationValueId!, 10),
          //  categoryId: parseInt(categoryId!, 10),
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

        console.log('values', {
          name,
          classification,
          category,
          payrun,
          description,
          processingType,
          prorate,
          reportingName,
          status,
          modifiedBy,
          effectiveEndDate,
          effectiveStartDate,
          payFrequency,
        });

        console.log('call made to post info');
        // const { data, error, isLoading } = usePostElementMutation();
      } catch (error) {
        console.log('error', error);
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
