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





/* validate: {
    space: (value) => {
      return !/\s+/g.test(String(value)) ? true : 'spaceValidation';
    },
    special: (value) => {
      return !/[!-/:-@[-`{-~]/.test(String(value)) ? true : 'noSpecialSymbols';
    },
    numbers: (value) => {
      return !/[0-9]/.test(String(value)) ? true : 'noNumbers';
    },
  }, */