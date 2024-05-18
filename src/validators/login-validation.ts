export const loginValidation = () => ({
  pattern: {
    value: /^\S+@\S+\.\S+$/,
    message: 'Ошибка валидации',
  },
  required: {
    value: true,
    message: 'Поле обязательно для заполнения',
  },
});
