export const loginValidation = () => ({
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
