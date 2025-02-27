import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'
import { UniqueIdentifier } from '@dnd-kit/core'

import { TCanvasElement } from '../../../../model/types'
import { CanvasElement } from '../CanvasElement/CanvasElement'

interface SortableElementProps {
	id: UniqueIdentifier
	index: number
	element: TCanvasElement
}

export const SortableElement = (props: SortableElementProps) => {
	const { id, index, element } = props

	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({
			id,
			data: {
				index,
				id,
				element,
			},
		})

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	}

	return (
		<div ref={setNodeRef} style={style} {...attributes} {...listeners}>
			<CanvasElement element={element} />
		</div>
	)
}
