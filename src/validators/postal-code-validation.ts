export const postalCodeValidation = (pattern: RegExp) => ({
    pattern: {
        value: pattern,
        message: 'Ведите корректный индекс',
    },
    required: {
        value: true,
        message: 'Поле обязательно для заполнения!',
    },
});
