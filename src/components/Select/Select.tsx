import React, { useEffect, useRef, useState } from 'react';

import styles from './Select.module.scss';
import classNames from 'classnames';
import { formatChosenValue, getUpdatedMultipleValue } from './Select.helpers';

export interface ISelectProps<T> {
  options: T[];
  value: T | T[];
  multiple?: boolean;
  onUpdate: (value: T | T[]) => void;
}

export function Select<T extends string>({ options, value, multiple, onUpdate }: ISelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const selectRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.addEventListener('click', handleOnOutsideClick);
    return () => document.removeEventListener('click', handleOnOutsideClick);
  });

  const handleOnOutsideClick = (evt: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(evt.target as any)) {
      setIsOpen(false);
    }
  };

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div
      ref={selectRef}
      className={classNames(styles.select, {
        [styles.open]: isOpen,
        [styles.multiple]: multiple,
      })}
    >
      <button
        className={styles.value}
        onClick={evt => {
          evt.preventDefault();
          toggleOpen();
        }}
      >
        {formatChosenValue(value)}
      </button>
      <div className={styles.dropdown}>
        {options.map(option => {
          const isSelected = Array.isArray(value) ? value.includes(option) : value === option;

          return (
            <label
              key={option}
              className={classNames(styles.option, {
                [styles.optionSelected]: isSelected,
              })}
              tabIndex={0}
              onClick={evt => evt.stopPropagation()}
            >
              <input
                type="checkbox"
                id={`tag-${option}`}
                checked={value.includes(option)}
                onChange={() => {
                  if (!multiple) {
                    onUpdate(option);
                    toggleOpen();
                  } else {
                    onUpdate(getUpdatedMultipleValue(value as T[], option));
                  }
                }}
              />
              {option}
            </label>
          );
        })}
      </div>
    </div>
  );
}
