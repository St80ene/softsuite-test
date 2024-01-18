import React from 'react';
import styles from './input.module.scss';
import { InputProps } from './interface';

const RadioInput = ({
  label,
  value,
  name,
  className = '',
  placeholder,
  onChange,
}: InputProps) => {
  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={name}>{label}</label>
      {/* <input
        name={name}
        type='radio'
        value={value}
        placeholder={placeholder}
        className={`${styles.inputWrapper__inputStyle} ${className}`}
        onChange={onChange}
        required
      /> */}
      <div className={styles.radioOptions}>
        <input type='radio' id='html' name='fav_language' value='HTML' /> {' '}
        <label htmlFor='html'>HTML</label>
        <br />
          <input type='radio' id='css' name='fav_language' value='CSS' /> {' '}
        <label htmlFor='css'>CSS</label>
      </div>
    </div>
  );
};

export default RadioInput;
