import { IDataItem, LevelType, TagType } from '../../service/data.types';

const isString = (value: any) => value && typeof value === 'string';
const isNumber = (value: any) => typeof value === 'number';

function compareValues<T>(value1: T, value2: T, isReverse?: boolean) {
  if (!isString(value1) && !isNumber(value1)) {
    return 1;
  }
  if (!isString(value2) && !isNumber(value2)) {
    return -1;
  }

  const firstValue = isReverse ? value2 : value1;
  const secondValue = isReverse ? value1 : value2;

  return isNumber(firstValue)
    ? (firstValue as number) - (secondValue as number)
    : (firstValue as string).localeCompare(secondValue as string);
}

const removeExtraSpaces = (text: string) =>
  text
    .split(' ')
    .filter(w => !!w.trim())
    .join(' ');

export const sortDataByValue = (
  data: IDataItem[],
  isReverse: boolean,
  key: keyof IDataItem | null,
): IDataItem[] => {
  if (!key) return data;

  const sortedData = [...data].sort((a, b) => compareValues(a[key], b[key], isReverse));

  return sortedData;
};

export const searchBySubstring = (
  data: IDataItem[],
  key: keyof IDataItem,
  substr: string,
  sensitive: boolean,
  exact: boolean,
): IDataItem[] => {
  if (!substr.trim()) return data;

  let formattedSubstr = substr;

  if (!sensitive) {
    formattedSubstr = formattedSubstr.toLowerCase();
  }

  if (!exact) {
    formattedSubstr = removeExtraSpaces(formattedSubstr);
  }

  return data.filter(item => {
    let text = item[key];
    if (typeof text !== 'string' || !text.trim()) return false;

    if (!sensitive) {
      text = text.toLowerCase();
    }

    if (!exact) {
      text = removeExtraSpaces(text);
    }

    return text.includes(formattedSubstr);
  });
};

export const hasChosenLevel = (level: LevelType, dataItem: IDataItem) =>
  level === 'none' || dataItem.reactLevel === level;

export const hasChosenTags = (tags: TagType[], dataItem: IDataItem) =>
  !tags.length || tags.some(tag => dataItem.tags.includes(tag));
