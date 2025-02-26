import { UiBuilder } from '../UiBuilder/ui'

import cls from './App.module.scss'

export const App = () => {
	return (
		<div className={cls.app}>
			<UiBuilder />
		</div>
	)
}
