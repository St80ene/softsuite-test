import React, { memo } from 'react';
import styles from './input.module.scss';
import { InputProps } from '../common/interfaces';

const RadioInput = ({
  label,
  name,
  options,
  register,
  error,
  setValue,
}: InputProps) => {
  const inputRegister = register(name, { required: 'This field is required' });
  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={name}>{label}</label>
      <div className={styles.radioOptions}>
        {options?.map(({ label, value }, index) => (
          <div key={index}>
            <input
              type='radio'
              name={inputRegister?.name}
              onChange={({ target }) => {
                setValue(name!, !!target?.value);
              }}
            />
            <label htmlFor={name}>{label}</label>
            <br />
          </div>
        ))}
      </div>
      {error && (
        <i className={styles.inputWrapper__errorText}>{label} is required</i>
      )}
    </div>
  );
};

export default memo(RadioInput);
