import React, { memo } from 'react';
import styles from './input.module.scss';
import { InputProps } from '../common/interfaces';

const InputSelect = ({
  label,
  name,
  className = '',
  placeholder,
  options,
  register,
  error,
  setValue,
}: InputProps) => {
  register(name, { required: 'This field is required' });
  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        className={`${styles.inputWrapper__inputStyle} ${className}`}
        onChange={({ target }) => setValue(name!, target?.value)}
      >
        <option value='' disabled hidden>
          {placeholder}
        </option>
        {options?.map(
          ({ value, label }: { label: string; value: string }, index) => (
            <option value={value} key={index}>
              {label}
            </option>
          )
        )}
      </select>
      {error && (
        <i className={styles.inputWrapper__errorText}>{label} is required</i>
      )}
    </div>
  );
};

export default memo(InputSelect);
