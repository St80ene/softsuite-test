import React from 'react';
import styles from './input.module.scss';
import { InputProps } from './interface';

const InputText = ({
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
      <input
        name={name}
        type='text'
        placeholder={placeholder}
        className={`${styles.inputWrapper__inputStyle} ${className}`}
        {...(register(name), { required: true })}
      />
      {errors['name'] && <span>This field is required</span>}
    </div>
  );
};

export default InputText;
