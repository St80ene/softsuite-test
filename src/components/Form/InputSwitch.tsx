import React from 'react';
import styles from './input.module.scss';
import { InputProps } from './interface';
import { Switch } from 'antd';

const InputSwitch = ({ label, name, register, errors }: InputProps) => {
  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={name}>{label}</label>
      <Switch
        defaultChecked
        {...(register(name), { required: true })}
        // className={`${styles.inputWrapper__inputStyle} ${className}`}
      />
      {errors['name'] && <span>This field is required</span>}
    </div>
  );
};

export default InputSwitch;
