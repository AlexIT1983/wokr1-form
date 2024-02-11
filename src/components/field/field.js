// Создадим отдельный компонент поле, который будет принимать пропсы и проверять поле

import { forwardRef } from 'react';
import styles from './field.module.css';

export const Field = forwardRef(({ error, ...prors }, ref) => {
	return (
		<div>
			<input ref={ref} {...prors} />
			{error && <span className={styles.errorLabel}>{error}</span>}
		</div>
	);
});
