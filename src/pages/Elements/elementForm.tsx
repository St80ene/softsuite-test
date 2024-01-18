import React from 'react';
import styles from '../../App.module.scss';
import inputStyles from '../../components/Form/input.module.scss';
import InputText from '../../components/Form/InputText';
import InputSelect from '../../components/Form/InputSelect';
import InputTextArea from '../../components/Form/InputTextArea';
import InputDate from '../../components/Form/InputDate';
import RadioInput from '../../components/Form/RadioInput';

export const Tab1 = ({}) => {
  return (
    <div className={inputStyles.modalContent}>
      <div className={inputStyles.inputContainer}>
        <InputText
          label='Name'
          name=''
          value='Etiene'
          placeholder='Input Name'
          onChange={() => console.log('value')}
        />
        <InputSelect
          label='Element Classification'
          name=''
          value='Etiene'
          placeholder='Select Classification'
          onChange={() => console.log('value')}
          options={[
            { label: 'Classification 1', value: 'Classification1' },
            { label: 'Classification 2', value: 'Classification2' },
          ]}
        />
      </div>

      <div className={inputStyles.inputContainer}>
        <InputSelect
          label='Element Category'
          name=''
          value='Etiene'
          placeholder='Select Element Category'
          onChange={() => console.log('value')}
          options={[
            { label: 'Category 1', value: 'Category1' },
            { label: 'Category 2', value: 'Category2' },
          ]}
        />

        <InputSelect
          label='Payrun'
          name=''
          value='Etiene'
          placeholder='Select Payrun'
          onChange={() => console.log('value')}
          options={[
            { label: 'Payrun 1', value: 'Payrun1' },
            { label: 'Payrun 2', value: 'Payrun2' },
            // Add more options as needed
          ]}
        />
      </div>

      <InputTextArea
        label='Description'
        name=''
        value='Etiene'
        placeholder='Input Decription'
        onChange={() => console.log('value')}
      />

      <InputTextArea
        label='Reporting Name'
        name=''
        value='Etiene'
        placeholder='Input Reporting Name'
        onChange={() => console.log('value')}
      />
    </div>
  );
};

export const Tab2 = ({}) => {
  return (
    <div className={inputStyles.modalContent}>
      <div className={inputStyles.inputContainer}>
        <InputDate
          label='Effective Start Date'
          name=''
          value='Etiene'
          placeholder='Select Date'
          onChange={() => console.log('value')}
        />
        <InputDate
          label='Effective End Date'
          name=''
          value='Etiene'
          placeholder='Select Date'
          onChange={() => console.log('value')}
        />
      </div>

      <div className={inputStyles.inputContainer}>
        <RadioInput
          label='Processing Type'
          name=''
          value='Etiene'
          placeholder='Select Element Category'
          onChange={() => console.log('value')}
        />

        <RadioInput
          label='Pay Frequency'
          name=''
          value='Etiene'
          placeholder='Select Element Category'
          onChange={() => console.log('value')}
        />
      </div>

      <InputSelect
        label='Selected Pay Months'
        name=''
        value='Etiene'
        placeholder='Select Payrun'
        onChange={() => console.log('value')}
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
      />

      <div className={inputStyles.inputContainer}>
        <RadioInput
          label='Prorate'
          name=''
          value='Etiene'
          placeholder='Select Element Category'
          onChange={() => console.log('value')}
        />

        <RadioInput
          label='Status'
          name=''
          value='Etiene'
          placeholder='Select Element Category'
          onChange={() => console.log('value')}
        />
      </div>
    </div>
  );
};
