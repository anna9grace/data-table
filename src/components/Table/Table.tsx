import React, { FC, KeyboardEvent, useMemo, useState } from 'react';

import styles from './Table.module.scss';
import { IDataItem, LevelType, TagType } from '../../service/data.types';
import { TableHeader } from '../TableHeader/TableHeader';
import { ISortSettings } from './Table.types';
import format from 'date-fns/format';

import { hasChosenLevel, hasChosenTags, searchBySubstring, sortDataByValue } from './Table.helpers';
import { Select } from '../Select/Select';
import { LEVEL_OPTIONS, TAG_OPTIONS } from './Table.contants';
import classNames from 'classnames';

export interface ITableProps {
  data: IDataItem[];
}

export const Table: FC<ITableProps> = ({ data }) => {
  const [sortSettings, setSortSettings] = useState<ISortSettings>({
    type: null,
    isReverse: false,
  });

  const [filterLevel, setFilterLevel] = useState<LevelType>('none');
  const [filterTags, setFilterTags] = useState<TagType[]>([]);
  const [searchTitle, setSearchTitle] = useState<string>('');
  const [searchDescription, setSearchDescription] = useState<string>('');

  const sortedData = useMemo(() => {
    let currentData = data;
    let hasFilters = filterLevel !== 'none' || filterTags.length;

    if (searchTitle) {
      currentData = searchBySubstring(currentData, 'title', searchTitle, false, true);
    }
    if (searchDescription) {
      currentData = searchBySubstring(currentData, 'description', searchDescription, true, false);
    }

    if (hasFilters) {
      currentData = currentData.filter(
        item => hasChosenLevel(filterLevel, item) && hasChosenTags(filterTags, item),
      );
    }

    return sortDataByValue(currentData, sortSettings.isReverse, sortSettings.type as any);
  }, [data, sortSettings, filterLevel, filterTags, searchTitle, searchDescription]);

  const handleOnSearch = (evt: KeyboardEvent, onSearch: (value: string) => void) => {
    const target = evt.target as HTMLInputElement;

    if (evt.key === 'Enter') {
      evt.preventDefault();
      onSearch(target.value);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.filters}>
        <label className={styles.field}>
          <span className={styles.label}>Поиск по заголовку</span>
          <input
            type="text"
            placeholder="введите текст"
            onKeyDown={evt => handleOnSearch(evt, setSearchTitle)}
          />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Поиск по описанию</span>
          <input
            type="text"
            placeholder="введите текст"
            onKeyDown={evt => handleOnSearch(evt, setSearchDescription)}
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Фильтр по уровню</span>
          <Select
            options={LEVEL_OPTIONS}
            onUpdate={(value: any) => setFilterLevel(value as LevelType)}
            value={filterLevel}
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Фильтр по тэгам</span>
          <Select
            options={TAG_OPTIONS}
            onUpdate={value => setFilterTags(value as TagType[])}
            multiple
            value={filterTags}
          />
        </label>
      </div>

      <table className={styles.table}>
        <TableHeader
          onSort={setSortSettings}
          sortSettings={sortSettings}
        />
        <tbody>
          {sortedData.map(item => (
            <tr
              className={styles.row}
              key={item.id}
            >
              <td className={classNames(styles.cell, styles.centerAlign)}>{item.id}</td>
              <td className={styles.cell}>{item.title}</td>
              <td className={styles.cell}>{item.description}</td>
              <td className={classNames(styles.cell, styles.centerAlign)}>
                {item.dttmCreated && format(new Date(item.dttmCreated), 'dd.MM.y HH:mm')}
              </td>
              <td className={classNames(styles.cell, styles.centerAlign)}>{item.reactLevel}</td>
              <td className={classNames(styles.cell, styles.centerAlign)}>
                {item.enabled ? 'Да' : 'Нет'}
              </td>
              <td className={classNames(styles.cell, styles.centerAlign)}>
                <span>{item.tags.join(', ')}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
