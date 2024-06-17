export const dateValidation = () => ({
  pattern: {
    value: /^\d{4}-\d{2}-\d{2}$/,
    message: 'Введите  дату в формате ГГГГ-ММ-ДД.',
  },
  required: {
    value: true,
    message: 'Поле обязательно для заполнения!',
  },
  validate: validateDate,
});

export const validateDate = (value: string): boolean | string => {
  const date: Date = new Date(value);
  if (date.getFullYear() < 1940) {
    return 'Неверный год рождения. Год должен быть больше или равен 1940.';
  }
  date.setFullYear(date.getFullYear() + 13);
  if (date > new Date()) {
    return 'Вы слишком молоды. Зарегистрироваться могут пользователи старше 13 лет.';
  }
  return true;
};
