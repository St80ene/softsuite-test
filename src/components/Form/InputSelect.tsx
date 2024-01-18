import React from 'react';
import styles from './input.module.scss';
import { InputProps } from './interface';

const InputSelect = ({
  label,
  value,
  name,
  classes,
  placeholder,
  onChange,
  options,
}: InputProps) => {
  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={name}>{label}</label>
      <select
        value={value}
        name={name}
        className={`${styles.inputWrapper__inputStyle} ${classes || ''}`}
        onChange={onChange}
      >
        <option value='' disabled hidden>
          {placeholder}
        </option>
        {options}
      </select>
    </div>
  );
};

export default InputSelect;
