export const passwordValidation = () => ({
  pattern: {
    value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}/,
    message:
      'Пароль должен содержать хотя бы одну строчную букву, одну прописную букву латинского алфавита, одну цифру, один специальный символ и быть не менее 8 символов',
  },
  required: {
    value: true,
    message: 'Поле обязательно для заполнения!',
  },
});
