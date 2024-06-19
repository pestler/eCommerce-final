import { ISortMenuItem } from '../interface/sort.interface.ts';

export const SORTS: ISortMenuItem[] = [
  {
    title: 'От А до Я',
    name: 'name.ru-by',
    value: 'asc',
  },
  {
    title: 'От Я до А',
    name: 'name.ru-by',
    value: 'desc',
  },
  {
    title: 'По возрастанию цены',
    name: 'price',
    value: 'asc',
  },
  {
    title: 'По убыванию цены',
    name: 'price',
    value: 'desc',
  },
];
