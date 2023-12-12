import { LevelType, TagType } from '../../service/data.types';
import { ITableColumn } from './Table.types';

export const TABLE_COLUMNS: ITableColumn[] = [
  { key: 'id', title: 'ID', width: 'small', isSortable: true },
  { key: 'title', title: 'Заголовок', isSortable: true },
  { key: 'description', title: 'Описание' },
  { key: 'dttmCreated', title: 'Создан', isSortable: true },
  { key: 'reactLevel', title: 'Уровень', width: 'medium' },
  { key: 'enabled', title: 'Действует', width: 'medium' },
  { key: 'tags', title: 'Флаги', width: 'small' },
];

export const LEVEL_OPTIONS: LevelType[] = ['none', 'warning', 'critical'];
export const TAG_OPTIONS: TagType[] = ['альфа', 'бета', 'гамма', 'омега', 'сигма'];
