import { classNames } from '../../../../model/utils/classNames'
import { getElement } from '../../../../model/utils'
import { TCanvasElement, TElementsMapItem } from '../../../../model/types'

import cls from './CanvasElement.module.scss'

interface CanvasElementProps {
	element: TCanvasElement
	elementsMap: Partial<TElementsMapItem>
	overlay?: boolean
}

export const CanvasElement = (props: CanvasElementProps) => {
	const { element, elementsMap, overlay } = props

	const mods = { [cls.overlay]: overlay }

	const Component = getElement(element.type, elementsMap)

	return <div className={classNames(cls.element, [], mods)}>{Component}</div>
}
