import React from 'react';
import styles from './input.module.scss';
import { InputProps } from './interface';

const InputText = ({
  label,
  value,
  name,
  className = '',
  placeholder,
  onChange,
}: InputProps) => {
  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        type='text'
        value={value}
        placeholder={placeholder}
        className={`${styles.inputWrapper__inputStyle} ${className}`}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default InputText;
