export function formatChosenValue<T>(value: T | T[]) {
  if (Array.isArray(value)) {
    return value.length ? value.join(', ') : '-';
  }
  return value;
}

export function getUpdatedMultipleValue<T>(currentValue: T[], option: T) {
  const updatedValue = [...currentValue];
  const index = currentValue.findIndex(m => m === option);

  if (index >= 0) {
    updatedValue.splice(index, 1);
  } else {
    updatedValue.push(option);
  }

  return updatedValue;
}
