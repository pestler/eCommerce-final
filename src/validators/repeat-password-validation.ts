export const repeatPasswordValidation = (passwordValue: string) => ({
  required: 'Repeat password is required',
  validate: (value: string) =>
    value === passwordValue || 'Passwords do not match',
});
