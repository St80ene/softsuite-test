import inputStyles from '../../components/Form/input.module.scss';
import InputComponent from '../../components/Form/InputComponent';
import { lookupValuesInt } from '../../components/common/interfaces';
import { useEffect, useState } from 'react';
import { fetchLookupValues } from '../../redux/lookupsSlice';
import { useDispatch } from 'react-redux';

export const Tab1 = ({
  register,
  errors,
  setValue,
}: {
  register: any;
  errors: any;
  setValue: any;
}) => {
  const dispatch = useDispatch();

  const [classificationOptions, setClassificationOptions] = useState<
    lookupValuesInt[]
  >([]);
  const [categoryOptions, setCategoryOptions] = useState<lookupValuesInt[]>([]);
  const [payRunOptions, setPayRunOptions] = useState<lookupValuesInt[]>([]);

  const handleClassificationChange = (selectedId: number) => {
    if (selectedId) {
      const selectedOption = classificationOptions.find(
        (option: lookupValuesInt) => Number(option.value) === selectedId
      );

      if (selectedOption) {
        setValue('classificationId', selectedOption.lookupId);
        setValue('classificationValueId', selectedOption.value);
      }
    }
  };

  const handleCategoryChange = (selectedId: number) => {
    if (selectedId) {
      const selectedOption = categoryOptions.find(
        (option: lookupValuesInt) => Number(option.value) === selectedId
      );
      if (selectedOption) {
        setValue('categoryId', selectedOption.lookupId);
        setValue('categoryValueId', selectedOption.value);
      }
    }
  };

  const handlePayRunChange = (selectedId: number) => {
    if (selectedId) {
      const selectedOption = payRunOptions.find(
        (option) => Number(option.value) === selectedId
      );
      if (selectedOption) {
        setValue('payRunId', selectedOption.lookupId);
        setValue('payRunValueId', selectedOption.value);
      }
    }
  };

  const handleOptions = (lookupValues: lookupValuesInt[]) => {
    const transformedOptions = lookupValues.map((item: lookupValuesInt) => ({
      label: item.label,
      value: item.value,
      lookupId: item.lookupId,
    }));
    return transformedOptions;
  };

  useEffect(() => {
    const fetchOptions = (
      id: number,
      setOptions: (options: lookupValuesInt[]) => void
    ) => {
      //@ts-expect-error thunk is any
      dispatch(fetchLookupValues(id))
        .unwrap()
        .then((result: lookupValuesInt[]) => {
          const options = handleOptions(result);

          setOptions(options);
        })
        .catch((error: Error) => {
          console.error(`Error fetching lookup values for id ${id}:`, error);
        });
    };
    fetchOptions(2, setClassificationOptions);
    fetchOptions(1, setCategoryOptions);
    fetchOptions(5, setPayRunOptions);
  }, [dispatch]);

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
          options={classificationOptions}
          register={register}
          error={errors['classificationId']}
          handleChange={handleClassificationChange}
        />
      </div>

      <div className={inputStyles.inputContainer}>
        <InputComponent
          type='select'
          label='Element Category'
          setValue={setValue}
          name='categoryId'
          placeholder='Select Element Category'
          options={categoryOptions}
          register={register}
          error={errors['categoryId']}
          handleChange={handleCategoryChange}
        />

        <InputComponent
          label='Payrun'
          type='select'
          setValue={setValue}
          name='payRunId'
          placeholder='Select Payrun'
          options={payRunOptions}
          register={register}
          error={errors['payRunId']}
          handleChange={handlePayRunChange}
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
