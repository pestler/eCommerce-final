export const postalCodeValidation = (pattern: RegExp) => ({
  pattern: {
    value: pattern,
    message: 'Введите корректный индекс',
  },
  required: {
    value: true,
    message: 'Поле обязательно для заполнения!',
  },
});
