import React, { memo } from 'react';
import styles from '../App.module.scss';
import { Divider } from 'antd';
import { CheckOutlined } from '@ant-design/icons';

interface StepProps {
  title: string;
  length: number;
  active: boolean;
  index: number;
  currentIndex: number;
}

const Steps = ({ length, active, index, currentIndex, title }: StepProps) => {
  return (
    <div
      className={styles.timelineContainer}
      style={{ width: `calc(100% / ${(length || 1) + 1})` }}
    >
      <div
        className={styles.stepIndicator}
        style={{ backgroundColor: active ? '#4BAA79' : 'white' }}
      >
        {currentIndex > index ? (
          <CheckOutlined style={{ color: 'white' }} />
        ) : (
          <span style={{ color: active ? 'white' : '#2D416F' }}>
            {index + 1}
          </span>
        )}
      </div>
      <Divider
        style={{
          borderColor: active ? '#4BAA79' : '#CDCDCD',
          borderWidth: '2px',
        }}
      />
      <h4
        className={styles.stepTitle}
        style={{ color: active ? '#4BAA79' : 'black' }}
      >
        {title}
      </h4>
    </div>
  );
};

export default Steps;
