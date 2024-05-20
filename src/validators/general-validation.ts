export const generalValidation = (value: boolean = true) => {
  return {
    required: {
      value: value,
      message: 'Поле обязательно для заполнения!',
    },
  }
}
