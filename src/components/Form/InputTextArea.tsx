import React from 'react';
import styles from './input.module.scss';
import { InputProps } from './interface';

const InputTextArea = ({
  label,
  value,
  name,
  className = '',
  onChange,
  placeholder,
}: InputProps) => {
  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={name}>{label}</label>
      <textarea
        value={value}
        placeholder={placeholder}
        name={name}
        className={`${styles.inputWrapper__inputStyle} ${styles.inputWrapper__textAreaStyle} ${className}`}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default InputTextArea;
