import inputStyles from '../../components/Form/input.module.scss';
import { useGetLookupsQuery } from '../../redux/dataSlice';
import { groupDataByCategory } from '../../utils';
import InputComponent from '../../components/Form/InputComponent';

export const Tab1 = ({
  register,
  errors,
  setValue,
}: {
  register: any;
  errors: any;
  setValue: any;
}) => {
  const { data: dataLookups } = useGetLookupsQuery();

  const groupedCategories = groupDataByCategory(
    dataLookups,
    'Element Category'
  );
  const groupedClassification = groupDataByCategory(
    dataLookups,
    'Element Classification'
  );
  const groupedPayRun = groupDataByCategory(dataLookups, 'Pay Run');

  return (
    <div className={inputStyles.modalContent}>
      <div className={inputStyles.inputContainer}>
        <InputComponent
          label='Name'
          type='text'
          name='name'
          placeholder='Input Name'
          register={register}
          error={errors['name']}
          setValue={setValue}
        />

        <InputComponent
          type='select'
          label='Element Classification'
          name='classificationId'
          setValue={setValue}
          placeholder='Select Classification'
          options={groupedClassification}
          register={register}
          error={errors['classificationId']}
        />
      </div>

      <div className={inputStyles.inputContainer}>
        <InputComponent
          type='select'
          label='Element Category'
          setValue={setValue}
          name='categoryId'
          placeholder='Select Element Category'
          options={groupedCategories}
          register={register}
          error={errors['categoryId']}
        />

        <InputComponent
          label='Payrun'
          type='select'
          setValue={setValue}
          name='payRunId'
          placeholder='Select Payrun'
          options={groupedPayRun}
          register={register}
          error={errors['payRunId']}
        />
      </div>

      <InputComponent
        type='textarea'
        label='Description'
        name='description'
        setValue={setValue}
        placeholder='Input Description'
        register={register}
        error={errors['description']}
      />

      <InputComponent
        type='textarea'
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
        <InputComponent
          type='date'
          label='Effective Start Date'
          name='effectiveStartDate'
          placeholder='Select Date'
          register={register}
          setValue={setValue}
          error={errors['effectiveStartDate']}
        />
        <InputComponent
          type='date'
          label='Effective End Date'
          name='effectiveEndDate'
          placeholder='Select Date'
          register={register}
          setValue={setValue}
          error={errors['effectiveEndDate']}
        />
      </div>

      <div className={inputStyles.inputContainer}>
        <InputComponent
          type='radio'
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

        <InputComponent
          type='radio'
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

      {/* <InputSelect
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
      /> */}

      <div className={inputStyles.inputContainer}>
        <InputComponent
          label='Prorate'
          name='prorate'
          type='radio'
          placeholder='Select Element Category'
          register={register}
          error={errors['prorate']}
          setValue={setValue}
          options={[
            { label: 'Yes', value: 'Yes' },
            { label: 'No', value: 'No' },
          ]}
        />
        <InputComponent
          type='switch'
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
