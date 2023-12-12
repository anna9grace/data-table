import React, { FC } from 'react';

import styles from './TableHeader.module.scss';
import { TABLE_COLUMNS } from '../Table/Table.contants';
import classNames from 'classnames';
import { ISortSettings } from '../Table/Table.types';

export interface ITableHeaderProps {
  sortSettings: ISortSettings;
  onSort: (value: ISortSettings) => void;
}

export const TableHeader: FC<ITableHeaderProps> = ({ onSort, sortSettings }) => {
  const handleOnColumnClick = (key: string) => {
    const isActive = sortSettings.type === key;

    onSort({
      type: isActive && sortSettings.isReverse ? null : key,
      isReverse: isActive ? !sortSettings.isReverse : false,
    });
  };

  return (
    <thead>
      <tr>
        {TABLE_COLUMNS.map(column => (
          <th
            key={column.key}
            onClick={column.isSortable ? () => handleOnColumnClick(column.key) : undefined}
            className={classNames(
              styles.column,
              column.width && styles[column.width],
              column.isSortable && styles.sortable,
            )}
          >
            <span className={styles.title}>
              {column.title}

              {sortSettings.type === column.key && (
                <span className={styles.sortIcon}>{sortSettings.isReverse ? '▼' : '▲'}</span>
              )}
            </span>
          </th>
        ))}
      </tr>
    </thead>
  );
};
