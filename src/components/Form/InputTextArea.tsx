import React, { memo } from 'react';
import styles from './input.module.scss';
import { InputProps } from '../common/interfaces';

const InputTextArea = ({
  label,
  name,
  className = '',
  placeholder,
  register,
  error,
  setValue,
}: InputProps) => {
  const inputRegister = register(name, { required: 'This field is required' });
  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={name}>{label}</label>
      <textarea
        placeholder={placeholder}
        name={name}
        className={`${styles.inputWrapper__inputStyle} ${styles.inputWrapper__textAreaStyle} ${className}`}
        onChange={({ target }) => setValue(name!, target?.value)}
      />
      {error && (
        <i className={styles.inputWrapper__errorText}>{label} is required</i>
      )}
    </div>
  );
};

export default memo(InputTextArea);
