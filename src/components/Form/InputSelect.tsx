import React from 'react';
import styles from './input.module.scss';
import { InputProps } from './interface';

const InputSelect = ({
  label,
  name,
  className = '',
  placeholder,
  options,
  register,
  errors,
}: InputProps) => {
  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        className={`${styles.inputWrapper__inputStyle} ${className}`}
        {...(register(name), { required: true })}
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
      {errors['name'] && <span>This field is required</span>}
    </div>
  );
};

export default InputSelect;
