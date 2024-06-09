export const updateArrayUtil = <T>(
  defaultArr: Array<T>,
  value: T,
  key?: keyof T,
): Array<T> => {
  const newArray = [...defaultArr];
  const index = newArray.findIndex((item: T) =>
    key ? item[key] === value[key] : item === value,
  );
  index >= 0 ? newArray.splice(index, 1) : newArray.push(value);
  return newArray;
};
