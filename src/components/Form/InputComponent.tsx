import React from 'react';
import { InputProps } from '../common/interfaces';
import styles from './input.module.scss';
import { Switch } from 'antd';

const InputComponent = ({
  type = 'text',
  label,
  name,
  className = '',
  placeholder,
  options,
  register,
  error,
  setValue,
  handleChange,
}: InputProps & { type: string }) => {
  const inputRegister = register(name, { required: 'This field is required' });

  let inputElement;

  switch (type) {
    case 'switch':
      inputElement = (
        <div className={styles.inputWrapper__inputStyle}>
          <Switch
            onChange={(checked) => {
              setValue(name!, checked);
            }}
          />
        </div>
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          placeholder={placeholder}
          name={name}
          className={`${styles.inputWrapper__inputStyle} ${styles.inputWrapper__textAreaStyle} ${className}`}
          onChange={({ target }) => setValue(name!, target?.value)}
        />
      );
      break;
    case 'radio':
      inputElement = (
        <div className={styles.radioOptions}>
          {options?.map(({ label, value }, index) => (
            <div key={index}>
              <input
                type='radio'
                name={inputRegister?.name}
                onChange={({ target }) => {
                  setValue(name!, !!target?.value);
                }}
              />
              <label htmlFor={name}>{label}</label>
              <br />
            </div>
          ))}
        </div>
      );
      break;
    case 'select':
      inputElement = (
        <select
          name={name}
          className={`${styles.inputWrapper__inputStyle} ${className}`}
          onChange={({ target }) => {
            if (handleChange) {
              handleChange(Number(target?.value));
            } else {
              setValue(name!, target?.value);
            }

            return;
          }}
        >
          <option value='' disabled hidden>
            {placeholder}
          </option>
          <option value='' disabled>
            Select an option
          </option>
          {options?.map(
            ({ value, label }: { label: string; value: string }, index) => (
              <option value={value} key={index}>
                {label}
              </option>
            )
          )}
        </select>
      );
      break;
    case 'date':
      inputElement = (
        <input
          type='date'
          placeholder={placeholder}
          className={`${styles.inputWrapper__inputStyle} ${className}`}
          onChange={({ target }) => setValue(name!, target?.value)}
        />
      );
      break;
    default:
      inputElement = (
        <input
          type='text'
          placeholder={placeholder}
          className={`${styles.inputWrapper__inputStyle} ${className}`}
          onChange={({ target }) => setValue(name!, target?.value)}
        />
      );
  }

  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={name}>{label}</label>
      {inputElement}
      {error &&
        (Array.isArray(error) ? (
          error?.map((error, index) => (
            <i className={styles.inputWrapper__errorText} key={index}>
              {error?.message}
            </i>
          ))
        ) : (
          <i className={styles.inputWrapper__errorText}>{error?.message}</i>
        ))}
    </div>
  );
};

export default InputComponent;
