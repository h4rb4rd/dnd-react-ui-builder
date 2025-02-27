import { DndContext, DragOverlay } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import { Canvas, CanvasElement } from '../Canvas'
import { SidebarElement } from '../Sidebar'
import { Sidebar } from '../Sidebar'
import { useUiBuilder } from '../../model/hooks/useUiBuilder'

import cls from './UiBuilder.module.scss'

export const UiBuilder = () => {
	const {
		activeSidebarElement,
		activeCanvasElement,
		elements,
		sidebarRegKey,
		handleDragStart,
		handleDragOver,
		handleDragEnd,
	} = useUiBuilder()

	return (
		<div className={cls.container}>
			<DndContext
				onDragStart={handleDragStart}
				onDragOver={handleDragOver}
				onDragEnd={handleDragEnd}
				autoScroll
			>
				{/* Announcements */}
				<Sidebar sidebarRegKey={sidebarRegKey} />
				<SortableContext
					strategy={verticalListSortingStrategy}
					items={elements.map(el => el.id)}
				>
					<Canvas elements={elements} />
				</SortableContext>
				<DragOverlay dropAnimation={null}>
					{/* show active dragged elements in overlay*/}
					{activeSidebarElement ? (
						<SidebarElement overlay element={activeSidebarElement} />
					) : null}
					{activeCanvasElement ? (
						<CanvasElement overlay element={activeCanvasElement} />
					) : null}
				</DragOverlay>
			</DndContext>
		</div>
	)
}
