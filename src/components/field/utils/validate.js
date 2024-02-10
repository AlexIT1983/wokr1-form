// функция валидации (принимает в себя value и validators)
export const validate = (value, validators) => {
	let validationError = null;

	validators.some((validator) => {
		validationError = validator(value);

		return validationError;
	});
	return validationError;
};
