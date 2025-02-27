import { classNames } from '../../../../model/utils/classNames'
import { getElement } from '../../../../model/utils'
import { TCanvasElement } from '../../../../model/types'

import cls from './CanvasElement.module.scss'

interface CanvasElementProps {
	element: TCanvasElement
	overlay?: boolean
}

export const CanvasElement = (props: CanvasElementProps) => {
	const { element, overlay } = props

	const mods = { [cls.overlay]: overlay }

	const Component = getElement(element.type)

	return (
		<div className={classNames(cls.canvasElement, [], mods)}>{Component}</div>
	)
}
