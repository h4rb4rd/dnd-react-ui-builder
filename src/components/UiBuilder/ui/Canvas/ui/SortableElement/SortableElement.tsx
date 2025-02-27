import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'
import { UniqueIdentifier } from '@dnd-kit/core'

import { CanvasElement } from '../CanvasElement/CanvasElement'
import { TCanvasElement, TElementsMapItem } from '../../../../model/types'

interface SortableElementProps {
	id: UniqueIdentifier
	index: number
	element: TCanvasElement
	elementsMap: Partial<TElementsMapItem>
}

export const SortableElement = (props: SortableElementProps) => {
	const { id, index, element, elementsMap } = props

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
			<CanvasElement element={element} elementsMap={elementsMap} />
		</div>
	)
}
