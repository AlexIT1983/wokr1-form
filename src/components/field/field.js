// Создадим отдельный компонент поле, который будет принимать пропсы и проверять поле
import { useState, useEffect } from 'react';
import { validate } from './utils/validate';
import styles from './field.module.css';

export const Field = ({
	value,
	setValue,
	setIsValid,
	validators,
	dependencies = {},
	forceValidation = () => false,
	...prors
}) => {
	// обработаем событие (их два. валидность)
	const [error, setError] = useState(null);
	const [isDirty, setIsDerty] = useState(false); // проверяем поля форм на предмет заполнения

	const validateField = (currentValue, isForceValidated) => {
		let error = null;
		let isValid = false;

		if (isForceValidated) {
			error = validate(currentValue, validators);
			isValid = error === null; // проверяем если ошибок нет, то поле валидно (true)
		}
		setError(error); // сетаем ошибку
		setIsValid(isValid); // сетаем валидность поля
	};

	useEffect(() => {
		validateField(value, isDirty);
	}, [...Object.values(dependencies)]);

	// обработчик изменения поля
	const onChange = ({ target }) => {
		setIsDerty(true);
		setValue(target.value);

		const isForceValidated = forceValidation(target.value);
		validateField(target.value, isForceValidated);
		// console.log('data', value);
	};
	// обработчик валидации
	const onBlur = () => validateField(value, isDirty);

	return (
		<div>
			<input value={value} onChange={onChange} onBlur={onBlur} {...prors} />
			{error && <span className={styles.errorLabel}>{error}</span>}
		</div>
	);
};
