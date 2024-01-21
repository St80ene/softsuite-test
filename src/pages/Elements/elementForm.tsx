import React from 'react';
import inputStyles from '../../components/Form/input.module.scss';
import InputText from '../../components/Form/InputText';
import InputSelect from '../../components/Form/InputSelect';
import InputTextArea from '../../components/Form/InputTextArea';
import InputDate from '../../components/Form/InputDate';
import RadioInput from '../../components/Form/RadioInput';
import InputSwitch from '../../components/Form/InputSwitch';

export const Tab1 = ({ register, errors }: { register: any; errors: any }) => {
  return (
    <div className={inputStyles.modalContent}>
      <div className={inputStyles.inputContainer}>
        <InputText
          label='Name'
          name='name'
          placeholder='Input Name'
          register={register}
          errors={errors}
        />
        <InputSelect
          label='Element Classification'
          name='classification'
          placeholder='Select Classification'
          options={[
            { label: 'Classification 1', value: 'Classification1' },
            { label: 'Classification 2', value: 'Classification2' },
          ]}
          register={register}
          errors={errors}
        />
      </div>

      <div className={inputStyles.inputContainer}>
        <InputSelect
          label='Element Category'
          name='category'
          placeholder='Select Element Category'
          options={[
            { label: 'Category 1', value: 'Category1' },
            { label: 'Category 2', value: 'Category2' },
          ]}
          register={register}
          errors={errors}
        />

        <InputSelect
          label='Payrun'
          name='payrun'
          placeholder='Select Payrun'
          options={[
            { label: 'Payrun 1', value: 'Payrun1' },
            { label: 'Close', value: 'Payrun2' },
          ]}
          register={register}
          errors={errors}
        />
      </div>

      <InputTextArea
        label='Description'
        name='description'
        placeholder='Input Description'
        register={register}
        errors={errors}
      />

      <InputTextArea
        label='Reporting Name'
        name='reportingName'
        placeholder='Input Reporting Name'
        register={register}
        errors={errors}
      />
    </div>
  );
};

export const Tab2 = ({ register, errors }: { register: any; errors: any }) => {
  return (
    <div className={inputStyles.modalContent}>
      <div className={inputStyles.inputContainer}>
        <InputDate
          label='Effective Start Date'
          name='effectiveStartDate'
          placeholder='Select Date'
          register={register}
          errors={errors}
        />
        <InputDate
          label='Effective End Date'
          name='effectiveEndDate'
          placeholder='Select Date'
          register={register}
          errors={errors}
        />
      </div>

      <div className={inputStyles.inputContainer}>
        <RadioInput
          label='Processing Type'
          name='processingType'
          placeholder='Select Element Category'
          options={[
            { label: 'Open', value: 'open' },
            { label: 'Close', value: 'close' },
          ]}
          register={register}
          errors={errors}
        />

        <RadioInput
          label='Pay Frequency'
          name='payFrequency'
          placeholder='Select Element Category'
          options={[
            { label: 'Monthly', value: 'monthly' },
            { label: 'Selected Months', value: 'selected months' },
          ]}
          register={register}
          errors={errors}
        />
      </div>

      <InputSelect
        label='Selected Pay Months'
        name='selectedMonths'
        placeholder='Select Payrun'
        className={inputStyles.monthPay}
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
        errors={errors}
      />

      <div className={inputStyles.inputContainer}>
        <RadioInput
          label='Prorate'
          name='prorate'
          placeholder='Select Element Category'
          register={register}
          errors={errors}
          options={[
            { label: 'Yes', value: 'Yes' },
            { label: 'No', value: 'No' },
          ]}
        />
        <InputSwitch
          label='Status'
          name='status'
          register={register}
          errors={errors}
        />
      </div>
    </div>
  );
};
