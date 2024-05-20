export const repeatPasswordValidation = (passwordValue: string) => ({
  required: 'Требуется повторить пароль',
  validate: (value: string) => value === passwordValue || 'Пароли не совпадают',
});
