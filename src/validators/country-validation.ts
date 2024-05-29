export const countryValidation = () => ({
  pattern: {
    value: /^\S+@\S+\.\S+$/,
    message:
      'Адрес электронной почты должен быть правильно отформатирован, не содержать пробелов (например user@example.com).',
  },
  required: {
    value: true,
    message: 'Поле обязательно для заполнения!',
  },
});



export const countries = [
  { code: 'US', pattern: /^\b\d{5}\b(?:[- ]{1}\d{4})?$/},
  { code: 'RU',  pattern: /^\d{6}$/ },
  { code: 'BY',  pattern: /^\d{6}$/ },
];
