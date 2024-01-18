import React from 'react';
import styles from './input.module.scss';
import { InputProps } from './interface';

const InputSelect = ({
  label,
  value,
  name,
  className = '',
  placeholder,
  onChange,
  options,
}: InputProps) => {
  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={name}>{label}</label>
      <select
        required
        value={value}
        name={name}
        className={`${styles.inputWrapper__inputStyle} ${className}`}
        onChange={onChange}
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
    </div>
  );
};

export default InputSelect;
