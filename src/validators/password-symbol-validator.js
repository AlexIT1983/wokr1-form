// Валидатор для проверки пароля на символы
// W - и не буквы и не цифры (w - наоборот буквы и цифры)
export const passwordSymbolsValidator = (value) =>
	/^\S+$/.test(value) &&
	/[a-zA-Z]+/.test(value) &&
	/[0-9]+/.test(value) &&
	/\W+/.test(value)
		? null
		: 'Пароль должен состоять из букв, цифр и символов';
