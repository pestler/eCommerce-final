export const nameValidation = () => ({
  pattern: {
    value: /^(?=.*[A-Z])(?=.*[a-z]).{2,}/,
    message:
      'Имя должно быть на английском языке, начинаться с большой буквы и содержать не менее 2 символов',
  },
  required: {
    value: true,
    message: 'Поле обязательно для заполнения!',
  },
});

export const surnameValidation = () => ({
  pattern: {
    value: /^(?=.*[A-Z])(?=.*[a-z]).{2,}/,
    message:
      'Фамилия должна быть на английском языке, начинаться с большой буквы и содержать не менее 2 символов',
  },
  required: {
    value: true,
    message: 'Поле обязательно для заполнения!',
  },
});
