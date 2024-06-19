import { describe, expect, test } from 'vitest';

import { passwordValidation } from '../src/validators/password-validation';

describe('Function passwordValidation works correctly', () => {
  test('expect correct returned value from passwordValidation', () => {
    expect(passwordValidation()).toStrictEqual({
      pattern: {
        value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}/,
        message:
          'Пароль должен содержать одну прописную букву латинского алфавита, одну цифру, один специальный символ и быть не менее 8 символов',
      },
      required: {
        value: true,
        message: 'Поле обязательно для заполнения!',
      },
    });
  });
});
