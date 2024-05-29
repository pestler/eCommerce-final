export interface ISort {
    name: 'price' | 'name.ru-by' | string,
    value: 'asc' | 'desc' | string
}

export interface ISortMenuItem {
    title: string,
    name: 'price' | 'name.ru-by' | string,
    value: 'asc' | 'desc' | string,
}
