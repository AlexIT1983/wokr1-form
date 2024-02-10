// урок 7 Работа с CSS Динамический рендеринг CSS-классов

import { useState } from 'react';
import styles from './MyComponent.module.css';

export const MyComponent = () => {
	const [showRedText, setShowRedText] = useState(false);

	const onClick = (event) => {
		setShowRedText(!showRedText); // вызывая событие onClick мы будем менять состояние showRedText(инвертируем)
	};
	// адаптируем текст кнопки через тернарный оператор
	// если showRedText есть то текст Красный иначе Белый!
	const text = <div className={showRedText ? styles.red : styles.white}>Текст</div>;
	// нажимая кнопку мы будем менять цвет текста
	return (
		<>
			{text}
			<button onClick={onClick}>Изменить цвет текста</button>
		</>
	);
};
