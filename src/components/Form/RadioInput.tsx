import React from 'react';
import styles from './input.module.scss';
import { InputProps } from './interface';

const RadioInput = ({ label, name, options, register, errors }: InputProps) => {
  const inputRegister = register(name, { required: 'This field is required' });
  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={name}>{label}</label>
      <div className={styles.radioOptions}>
        {options?.map(({ label, value }, index) => (
          <>
            <input
              type='radio'
              name={inputRegister?.name}
              onChange={(event) => {
                inputRegister.onChange({ target: { value } });
              }}
              key={index}
            />
            <label htmlFor={name}>{label}</label>
            <br />
          </>
        ))}
      </div>
      {errors[name] && <span>This field is required</span>}
    </div>
  );
};

export default RadioInput;
