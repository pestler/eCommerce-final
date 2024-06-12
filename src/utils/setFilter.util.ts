import { FilterKeyValueByAttributes } from '../interface/filters.type.ts';

export const setFilterUtil = ({ key, value }: FilterKeyValueByAttributes) => {
  switch (key) {
    case 'heightFrom':
      return `Высота от ${value} см`;
    case 'heightTo':
      return `Высота до ${value} см`;
    case 'diameterTo':
      return `Диаметр до ${value} см`;
    case 'diameterFrom':
      return `Диаметр от ${value} см`;
  }
};
