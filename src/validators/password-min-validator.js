// Валидатор для проверки минимальной длины пароля

export const passwordMinValitator = (value) =>
	value.length >= 8 ? null : 'Минимальная длина пароля 8 символов';
