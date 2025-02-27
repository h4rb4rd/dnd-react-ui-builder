import { useCallback, useState } from 'react'

import { DndContent } from '../DndContent/DndContent'
import { StaticContent } from '../StaticContent/StaticContent'
import {
	TCanvasElement,
	TElementsMapItem,
	TSidebarElement,
} from '../../model/types'

import cls from './UiBuilder.module.scss'

interface UiBuilderProps {
	canvasElements: TCanvasElement[]
	sidebarElements: TSidebarElement[]
	elementsMap: Partial<TElementsMapItem>
	onChange: (elements: TCanvasElement[]) => void
}

export const UiBuilder = (props: UiBuilderProps) => {
	const { canvasElements, sidebarElements, elementsMap, onChange } = props

	const [isEditable, setIsEditable] = useState(true)

	const toggleEdit = useCallback(() => setIsEditable(prev => !prev), [])

	return (
		<>
			<button className={cls.btn} onClick={toggleEdit}>
				{isEditable ? 'edit off' : 'edit on'}
			</button>
			{isEditable ? (
				<DndContent
					canvasElements={canvasElements}
					sidebarElements={sidebarElements}
					elementsMap={elementsMap}
					onChange={onChange}
				/>
			) : (
				<StaticContent
					canvasElements={canvasElements}
					elementsMap={elementsMap}
				/>
			)}
		</>
	)
}
