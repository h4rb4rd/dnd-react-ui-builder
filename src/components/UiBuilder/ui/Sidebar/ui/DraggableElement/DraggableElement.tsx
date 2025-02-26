import { useRef } from 'react'
import { nanoid } from 'nanoid'
import { useDraggable } from '@dnd-kit/core'

import { SidebarElement } from '../SidebarElement/SidebarElement'
import { TSidebarElement } from '../../../../model/types'

import cls from './DraggableElement.module.scss'

interface DraggableElementProps {
	element: TSidebarElement
	overlay?: boolean
}

export const DraggableElement = (props: DraggableElementProps) => {
	const { element, overlay } = props

	const id = useRef(nanoid())

	const { attributes, listeners, setNodeRef } = useDraggable({
		id: id.current,
		data: {
			element,
			fromSidebar: true,
		},
	})

	return (
		<div
			ref={setNodeRef}
			className={cls.element}
			{...listeners}
			{...attributes}
		>
			<SidebarElement element={element} overlay={overlay} />
		</div>
	)
}
