export type LevelType = 'none' | 'warning' | 'critical';
export type TagType = 'альфа' | 'бета' | 'гамма' | 'омега' | 'сигма';

export interface IDataItem {
  id: number;
  title: string | null;
  description: string | null;
  reactLevel: LevelType;
  enabled: boolean | null;
  dttmCreated: string | null;
  tags: TagType[];
}

export interface IData {
  success: boolean;
  message: string;
  data: {
    items: IDataItem[];
  };
}
