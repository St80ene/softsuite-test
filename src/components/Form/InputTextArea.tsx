import React from 'react';
import styles from './input.module.scss';
import { InputProps } from './interface';

const InputTextArea = ({
  label,
  name,
  className = '',
  placeholder,
  register,
  errors,
}: InputProps) => {
  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={name}>{label}</label>
      <textarea
        placeholder={placeholder}
        name={name}
        className={`${styles.inputWrapper__inputStyle} ${styles.inputWrapper__textAreaStyle} ${className}`}
        {...(register(name), { required: true })}
      />
      {errors['name'] && <span>This field is required</span>}
    </div>
  );
};

export default InputTextArea;
