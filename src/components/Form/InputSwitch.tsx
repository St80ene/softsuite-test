import React, { memo } from 'react';
import styles from './input.module.scss';
import { InputProps } from '../common/interfaces';
import { Switch } from 'antd';

const InputSwitch = ({
  label,
  name,
  register,
  error,
  setValue,
}: InputProps) => {
  register(name, { required: 'This field is required' });
  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={name}>{label}</label>
      <div className={styles.inputWrapper__inputStyle}>
        <Switch
          onChange={(checked) => {
            setValue(name!, checked);
          }}
        />
      </div>
      {error && (
        <i className={styles.inputWrapper__errorText}>{label} is required</i>
      )}
    </div>
  );
};

export default memo(InputSwitch);
