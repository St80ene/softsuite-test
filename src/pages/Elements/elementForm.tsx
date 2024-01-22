import React from 'react';
import inputStyles from '../../components/Form/input.module.scss';
import InputText from '../../components/Form/InputText';
import InputSelect from '../../components/Form/InputSelect';
import InputTextArea from '../../components/Form/InputTextArea';
import InputDate from '../../components/Form/InputDate';
import RadioInput from '../../components/Form/RadioInput';
import InputSwitch from '../../components/Form/InputSwitch';

export const Tab1 = ({
  register,
  errors,
  setValue,
}: {
  register: any;
  errors: any;
  setValue: any;
}) => {
  return (
    <div className={inputStyles.modalContent}>
      <div className={inputStyles.inputContainer}>
        <InputText
          label='Name'
          name='name'
          placeholder='Input Name'
          register={register}
          error={errors['name']}
          setValue={setValue}
        />
        <InputSelect
          label='Element Classification'
          name='classification'
          setValue={setValue}
          placeholder='Select Classification'
          options={[
            { label: 'SelectClassification', value: '' },
            { label: 'Classification 1', value: 'Classification1' },
            { label: 'Classification 2', value: 'Classification2' },
          ]}
          register={register}
          error={errors['classification']}
        />
      </div>

      <div className={inputStyles.inputContainer}>
        <InputSelect
          label='Element Category'
          setValue={setValue}
          name='category'
          placeholder='Select Element Category'
          options={[
            { label: 'Category 1', value: 'Category1' },
            { label: 'Category 2', value: 'Category2' },
          ]}
          register={register}
          error={errors['category']}
        />

        <InputSelect
          label='Payrun'
          setValue={setValue}
          name='payrun'
          placeholder='Select Payrun'
          options={[
            { label: 'Payrun 1', value: 'Payrun1' },
            { label: 'Close', value: 'Payrun2' },
          ]}
          register={register}
          error={errors['payrun']}
        />
      </div>

      <InputTextArea
        label='Description'
        name='description'
        setValue={setValue}
        placeholder='Input Description'
        register={register}
        error={errors['description']}
      />

      <InputTextArea
        label='Reporting Name'
        name='reportingName'
        setValue={setValue}
        placeholder='Input Reporting Name'
        register={register}
        error={errors['reportingName']}
      />
    </div>
  );
};

export const Tab2 = ({
  register,
  errors,
  setValue,
}: {
  register: any;
  errors: any;
  setValue: any;
}) => {
  return (
    <div className={inputStyles.modalContent}>
      <div className={inputStyles.inputContainer}>
        <InputDate
          label='Effective Start Date'
          name='effectiveStartDate'
          placeholder='Select Date'
          register={register}
          setValue={setValue}
          error={errors['effectiveStartDate']}
        />
        <InputDate
          label='Effective End Date'
          name='effectiveEndDate'
          placeholder='Select Date'
          register={register}
          setValue={setValue}
          error={errors['effectiveEndDate']}
        />
      </div>

      <div className={inputStyles.inputContainer}>
        <RadioInput
          label='Processing Type'
          name='processingType'
          placeholder='Select Element Category'
          setValue={setValue}
          options={[
            { label: 'Open', value: 'open' },
            { label: 'Close', value: 'close' },
          ]}
          register={register}
          error={errors['processingType']}
        />

        <RadioInput
          label='Pay Frequency'
          name='payFrequency'
          setValue={setValue}
          placeholder='Select Pay frrequency'
          options={[
            { label: 'Monthly', value: 'monthly' },
            { label: 'Selected Months', value: 'selected months' },
          ]}
          register={register}
          error={errors['payFrequency']}
        />
      </div>

      <InputSelect
        label='Selected Pay Months'
        name='selectedMonths'
        placeholder='Select Payrun'
        className={inputStyles.monthPay}
        setValue={setValue}
        options={[
          { label: 'January', value: 'january' },
          { label: 'February', value: 'february' },
          { label: 'March', value: 'march' },
          { label: 'April', value: 'april' },
          { label: 'May', value: 'may' },
          { label: 'June', value: 'june' },
          { label: 'July', value: 'july' },
          { label: 'August', value: 'august' },
          { label: 'September', value: 'september' },
          { label: 'October', value: 'october' },
          { label: 'November', value: 'november' },
          { label: 'December', value: 'december' },
        ]}
        register={register}
        error={errors['selectedMonths']}
      />

      <div className={inputStyles.inputContainer}>
        <RadioInput
          label='Prorate'
          name='prorate'
          placeholder='Select Element Category'
          register={register}
          error={errors['prorate']}
          setValue={setValue}
          options={[
            { label: 'Yes', value: 'Yes' },
            { label: 'No', value: 'No' },
          ]}
        />
        <InputSwitch
          label='Status'
          name='status'
          register={register}
          setValue={setValue}
          error={errors['status']}
        />
      </div>
    </div>
  );
};
