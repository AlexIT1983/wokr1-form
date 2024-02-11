//  Задание 1 (вариант 2, Yup and Hook Form)(4.Формы)

import { useRef, useEffect } from 'react'; // подключаем хук useState useRef
import { Field } from './components/field/field';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registrationFormScheme } from './registration-form-scheme'; // подключаем нашу схему yup

import styles from './App.module.css';

// функция сохранения данных для вывода их после

// Компонент App
export const App = () => {
	const {
		register,
		handleSubmit,
		trigger,
		formState: { touchedFields, isValid, errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			passcheck: '',
		},
		resolver: yupResolver(registrationFormScheme),
		mode: 'onTouched',
	});

	// укажем нашу функцию для обработки отправки формы
	const onSubmit = ({ email, password }) => {
		console.log({ email, password });
	};

	const submitButtonRef = useRef(null);
	// используем useEffect для переключения фокуса

	useEffect(() => {
		if (isValid) {
			submitButtonRef.current.focus();
		}
	}, [isValid]);

	// сделаем обработчик для изменения полей ввода

	return (
		<div className={styles.app}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Field
					type="text"
					placeholder="Почта"
					error={errors.email?.message}
					{...register('email')}
				/>
				<Field
					type="password"
					placeholder="Пароль"
					error={errors.password?.message}
					{...register('password', {
						onChange: () => touchedFields.passcheck && trigger('passcheck'),
					})}
				/>
				<Field
					type="password"
					placeholder="Повтор пароля"
					error={errors.passcheck?.message}
					{...register('passcheck')}
				/>

				<button ref={submitButtonRef} type="submit" disabled={!isValid}>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
