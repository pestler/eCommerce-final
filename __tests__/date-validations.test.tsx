import { describe, expect, test } from 'vitest';

import { validateDate } from '../src/validators/date-validation';

describe('Function validateDate works correctly', () => {
  test('expect correct returned value from validateDate', () => {
    expect(validateDate('2023-08-01')).toBe('Вы слишком молоды. Зарегистрироваться могут пользователи старше 13 лет.');
    expect(validateDate('2022-08-01')).toBe('Вы слишком молоды. Зарегистрироваться могут пользователи старше 13 лет.');
    expect(validateDate('2021-08-01')).toBe('Вы слишком молоды. Зарегистрироваться могут пользователи старше 13 лет.');
    expect(validateDate('2012-08-01')).toBe('Вы слишком молоды. Зарегистрироваться могут пользователи старше 13 лет.');
    expect(validateDate('2006-08-01')).toBe(true);
    expect(validateDate('2010-08-01')).toBe(true);
    expect(validateDate('1939-08-01')).toBe(
      'Неверный год рождения. Год должен быть больше или равен 1940.',
    );
  }
);
});
