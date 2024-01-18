import React from 'react';
import styles from './input.module.scss';
import { InputProps } from './interface';

const InputDate = ({
  label,
  value,
  name,
  classes,
  placeholder,
  onChange,
}: InputProps) => {
  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={name}>{label}</label>
      <input
        type='date'
        value={value}
        placeholder={placeholder}
        className={`${styles.inputWrapper__inputStyle} ${classes || ''}`}
        onChange={onChange}
      />
    </div>
  );
};

export default InputDate;
