export const nameValidation = () => ({
  pattern: {
    value: /^[А-ЯЁ][а-яё]+$/,
    message:
      'Имя должно содержать только кириллические символы и начинаться с большой буквы',
  },
  required: {
    value: true,
    message: 'Поле обязательно для заполнения!',
  },
});

export const surnameValidation = () => ({
  pattern: {
    value: /^[А-ЯЁ][а-яё]+$/,
    message:
      'Фамилия должна содержать только кириллические символы, начинаться с большой буквы и содержать не менее двух символов',
  },
  required: {
    value: true,
    message: 'Поле обязательно для заполнения!',
  },
});
