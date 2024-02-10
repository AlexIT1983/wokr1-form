//  Задание 1 (4.Формы)

import { useState, useRef, useEffect } from 'react'; // подключаем хук useState useRef
import { Field } from './components/field/field';
import {
	emailValidator,
	passwordMinValitator,
	passwordSymbolsValidator,
} from './validators'; // валидатор почты и паролей

import styles from './App.module.css';

// функция сохранения данных для вывода их после

// Компонент App
export const App = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passcheck, setPasscheck] = useState('');

	const [isEmailValid, setIsEmailValid] = useState(false);
	const [isPasswordValid, setIsPasswordValid] = useState(false);
	const [isPasscheckValid, setIsPasscheckValid] = useState(false);

	// проверяем валидность всем формы
	const isFormValid = isEmailValid && isPasswordValid && isPasscheckValid;

	// укажем нашу функцию для обработки отправки формы
	const onSubmit = (event) => {
		event.preventDefault();
		console.log({ email, password });
	};

	const submitButtonRef = useRef(null);
	// используем useEffect для переключения фокуса

	useEffect(() => {
		if (isEmailValid) {
			submitButtonRef.current.focus();
		}
	});

	// сделаем обработчик для изменения полей ввода

	return (
		<div className={styles.app}>
			<form onSubmit={onSubmit}>
				<Field
					type="text"
					name={'email'}
					placeholder="Почта"
					value={email}
					setValue={setEmail}
					setIsValid={setIsEmailValid}
					validators={[emailValidator]}
				/>
				<Field
					type="password"
					name={'password'}
					placeholder="Пароль"
					value={password}
					setValue={setPassword}
					setIsValid={setIsPasswordValid}
					validators={[passwordMinValitator, passwordSymbolsValidator]}
				/>
				<Field
					type="password"
					name={'passcheck'}
					placeholder="Повтор пароля"
					value={passcheck}
					setValue={setPasscheck}
					setIsValid={setIsPasscheckValid}
					validators={[
						(value) => (value === password ? null : 'Пароли не совпадают'),
					]}
					dependencies={{ password }}
					forceValidation={(value) =>
						value.length > 0 && value.length >= password.length
					}
				/>

				<button ref={submitButtonRef} type="submit" disabled={!isFormValid}>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
