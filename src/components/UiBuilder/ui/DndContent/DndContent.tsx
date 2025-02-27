import { DndContext, DragOverlay } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import { Canvas, CanvasElement } from '../Canvas'
import { SidebarElement } from '../Sidebar'
import { Sidebar } from '../Sidebar'
import {
	TCanvasElement,
	TElementsMapItem,
	TSidebarElement,
} from '../../model/types'
import { useUiBuilder } from '../../model/hooks/useUiBuilder'

import cls from './DndContent.module.scss'

interface DndContentProps {
	canvasElements: TCanvasElement[]
	sidebarElements: TSidebarElement[]
	elementsMap: Partial<TElementsMapItem>
	onChange: (elements: TCanvasElement[]) => void
}

export const DndContent = (props: DndContentProps) => {
	const { canvasElements, sidebarElements, elementsMap, onChange } = props

	const {
		activeSidebarElement,
		activeCanvasElement,
		sidebarRegKey,
		handleDragStart,
		handleDragOver,
		handleDragEnd,
	} = useUiBuilder(canvasElements, onChange)

	return (
		<div className={cls.container}>
			<DndContext
				onDragStart={handleDragStart}
				onDragOver={handleDragOver}
				onDragEnd={handleDragEnd}
				autoScroll
			>
				{/* Announcements */}
				<Sidebar
					sidebarRegKey={sidebarRegKey}
					sidebarElements={sidebarElements}
				/>
				<SortableContext
					strategy={verticalListSortingStrategy}
					items={canvasElements.map(el => el.id)}
				>
					<Canvas elements={canvasElements} elementsMap={elementsMap} />
				</SortableContext>
				<DragOverlay dropAnimation={null}>
					{/* show active dragged elements in overlay*/}
					{activeSidebarElement ? (
						<SidebarElement overlay element={activeSidebarElement} />
					) : null}
					{activeCanvasElement ? (
						<CanvasElement
							overlay
							element={activeCanvasElement}
							elementsMap={elementsMap}
						/>
					) : null}
				</DragOverlay>
			</DndContext>
		</div>
	)
}
