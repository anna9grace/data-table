export interface ITableColumn {
  key: string;
  title: string;
  width?: 'small' | 'medium';
  isSortable?: boolean;
}

export interface ISortSettings {
  type: string | null;
  isReverse: boolean;
}
