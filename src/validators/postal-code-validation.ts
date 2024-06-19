export const postalCodeValidation = (
  pattern: RegExp,
  required: boolean = true,
) => ({
  pattern: {
    value: pattern,
    message: 'Введите корректный индекс',
  },
  required: {
    value: required,
    message: 'Поле обязательно для заполнения!',
  },
});
