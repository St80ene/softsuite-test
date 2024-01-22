import React, { memo } from 'react';
import styles from './input.module.scss';
import { InputProps } from './interface';

const InputText = ({
  label,
  name,
  className = '',
  placeholder,
  register,
  error,
  setValue,
}: InputProps) => {
  register(name, { required: 'This field is required' });

  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={name}>{label}</label>
      <input
        placeholder={placeholder}
        className={`${styles.inputWrapper__inputStyle} ${className}`}
        onChange={({ target }) => setValue(name!, target?.value)}
      />
      {error && (
        <i className={styles.inputWrapper__errorText}>{label} is required</i>
      )}
    </div>
  );
};

export default memo(InputText);
