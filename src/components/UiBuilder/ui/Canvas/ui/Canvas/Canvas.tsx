import { useDroppable } from '@dnd-kit/core'

import { SortableElement } from '../SortableElement/SortableElement'
import { TCanvasElement } from '../../../../model/types'

import cls from './Canvas.module.scss'

interface CanvasProps {
	elements: TCanvasElement[]
}

export const Canvas = (props: CanvasProps) => {
	const { elements } = props

	const { setNodeRef } = useDroppable({
		id: 'canvas_droppable',
		data: {
			parent: null,
			isContainer: true,
		},
	})

	return (
		<div ref={setNodeRef} className={cls.canvas}>
			<div className={cls.elements}>
				{elements?.map((el, i) => (
					<SortableElement key={el.id} id={el.id} element={el} index={i} />
				))}
			</div>
		</div>
	)
}
