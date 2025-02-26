import { classNames } from '../../../../model/utils/classNames'
import { TSidebarElement } from '../../../../model/types'

import cls from './SidebarElement.module.scss'

interface SidebarElementProps {
	element: TSidebarElement
	overlay?: boolean
}

export const SidebarElement = (props: SidebarElementProps) => {
	const { element, overlay } = props

	const mods = { [cls.overlay]: overlay }

	return (
		<div className={classNames(cls.element, [], mods)}>{element.title}</div>
	)
}
