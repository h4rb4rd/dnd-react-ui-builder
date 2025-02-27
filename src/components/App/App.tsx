import { useCallback, useState } from 'react'
import { TCanvasElement } from '../UiBuilder/model/types'
import { UiBuilder } from '../UiBuilder/ui'

import { sidebarElements } from '../UiBuilder/model/constants'
import { elementsMap } from '../UiBuilder/model/constants'

import cls from './App.module.scss'

export const App = () => {
	const [elements, setElements] = useState<TCanvasElement[]>([])

	const handleSetElements = useCallback((elements: TCanvasElement[]) => {
		setElements(elements)
	}, [])

	return (
		<div className={cls.app}>
			<UiBuilder
				canvasElements={elements}
				sidebarElements={sidebarElements}
				elementsMap={elementsMap}
				onChange={handleSetElements}
			/>
		</div>
	)
}
