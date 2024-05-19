export const nameValidation = () => ({
  pattern: {
    value: /^(?=.*[A-Z])(?=.*[a-z]).{4,}/,
    message:
      'Имя должно содержать не менее 4 символов и начинаться с большой буквы',
  },
  required: {
    value: true,
    message: 'Поле обязательно для заполнения!',
  },
});
