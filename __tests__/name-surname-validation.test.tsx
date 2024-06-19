import { describe, expect, test } from 'vitest';

import { nameValidation, surnameValidation } from '../src/validators/name-surname-validation';

describe('Function nameValidation works correctly', () => {
  test('expect correct returned value from nameValidation', () => {
    expect(nameValidation()).toStrictEqual({
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
  }),
  test('expect correct returned value from nameValidation', () => {
    expect(surnameValidation()).toStrictEqual({
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
  });
},

);


