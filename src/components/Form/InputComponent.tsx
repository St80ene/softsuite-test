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
}: InputProps & { type: string }) => {
  const inputRegister = register(name, { required: 'This field is required' });

  // const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
  //   setValue(name!, target?.value);
  // };

  // const handleSwitchChange = (checked: boolean) => {
  //   setValue(name!, checked);
  // };

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
          onChange={({ target }) => setValue(name!, target?.value)}
        >
          <option value='' disabled hidden>
            {placeholder}
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
      {error && (
        <i className={styles.inputWrapper__errorText}>{label} is required</i>
      )}
    </div>
  );
};

export const InputSelect = ({
  label,
  name,
  className = '',
  placeholder,
  options,
  register,
  error,
  setValue,
}: InputProps) => {
  register(name, { required: 'This field is required' });
  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        className={`${styles.inputWrapper__inputStyle} ${className}`}
        onChange={({ target }) => setValue(name!, target?.value)}
      >
        <option value='' disabled hidden>
          {placeholder}
        </option>
        {options?.map(
          ({ value, label }: { label: string; value: string }, index) => (
            <option value={value} key={index}>
              {label}
            </option>
          )
        )}
      </select>
      {error && (
        <i className={styles.inputWrapper__errorText}>{label} is required</i>
      )}
    </div>
  );
};

export const InputSwitch = ({
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

export const InputText = ({
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

export const InputTextArea = ({
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

export const RadioInput = ({
  label,
  name,
  options,
  register,
  error,
  setValue,
}: InputProps) => {
  const inputRegister = register(name, { required: 'This field is required' });
  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={name}>{label}</label>
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
      {error && (
        <i className={styles.inputWrapper__errorText}>{label} is required</i>
      )}
    </div>
  );
};

export default InputComponent;
