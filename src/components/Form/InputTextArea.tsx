import React from 'react';
import styles from './input.module.scss';
import { InputProps } from './interface';

const InputTextArea = ({
  label,
  value,
  name,
  classes,
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
        className={`${styles.inputWrapper__inputStyle} ${
          styles.inputWrapper__textAreaStyle
        } ${classes || ''}`}
        onChange={onChange}
      />
    </div>
  );
};

export default InputTextArea;
