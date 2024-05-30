export const cityValidation = (value: boolean = true) => ({
  pattern: {
    value: /[а-яА-Яa-zA-ZёЁ]+$/,
    message:
      'Название города должно содержать только буквы и не содержать пробелы',
  },  
    required: {
      value: value,
      message: 'Поле обязательно для заполнения!',
    },  
});

export const streetValidation = (value: boolean = true) => ({
  pattern: {
    value: /[а-яА-Яa-zA-ZёЁ]+$/,
    message:
      'Название улицы должно содержать только буквы и не содержать пробелы',
  },  
    required: {
      value: value,
      message: 'Поле обязательно для заполнения!',
    },  
});

