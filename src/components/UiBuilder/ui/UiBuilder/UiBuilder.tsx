import { useCallback, useRef, useState } from 'react'
import {
	DndContext,
	DragEndEvent,
	DragOverEvent,
	DragOverlay,
	DragStartEvent,
} from '@dnd-kit/core'
import {
	arrayMove,
	SortableContext,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useImmer } from 'use-immer'

import { Canvas, CanvasElement } from '../Canvas'
import { createSpacer } from '../../model/utils'
import { SidebarElement } from '../Sidebar'
import { Sidebar } from '../Sidebar'
import { TDragElement, TSidebarElement } from '../../model/types'

import '../../styles/uiBuilder.scss'
import cls from './UiBuilder.module.scss'

export const UiBuilder = () => {
	const [sidebarRegKey, setSidebarRegKey] = useState(Date.now())
	const [activeSidebarElement, setActiveSidebarElement] =
		useState<TSidebarElement | null>(null) // only for elements from the sidebar
	const [activeCanvasElement, setActiveCanvasElement] =
		useState<TDragElement | null>(null) // only for elements that are in the form.
	const spacerInsertedRef = useRef(false)
	const currentDragElementRef = useRef<TDragElement | null>(null)
	const [data, updateData] = useImmer<{ elements: TDragElement[] }>({
		elements: [],
	})
	const { elements } = data

	const cleanUp = useCallback(() => {
		setActiveSidebarElement(null)
		setActiveCanvasElement(null)
		currentDragElementRef.current = null
		spacerInsertedRef.current = false
	}, [])

	const handleDragStart = useCallback(
		(e: DragStartEvent) => {
			const { active } = e
			const activeData = active.data?.current ?? {}

			if (activeData?.fromSidebar) {
				setActiveSidebarElement(activeData.element)

				// Create a new element that'll be added to the elements array
				// if we drag it over the canvas.
				currentDragElementRef.current = {
					id: active.id,
					type: activeData.element.type,
					name: `${activeData.element.type}${data.elements.length + 1}`,
					parent: null,
				}
				return
			}

			// We aren't creating a new element so go ahead and just insert the spacer
			// since this element already belongs to the canvas.
			const { element, index } = activeData

			setActiveCanvasElement(element)
			currentDragElementRef.current = element

			updateData(draft => {
				draft.elements.splice(index, 1, createSpacer(active.id))
			})
		},
		[data.elements.length, updateData]
	)

	const handleDragOver = useCallback(
		(e: DragOverEvent) => {
			const { active, over } = e
			const activeData = active.data?.current ?? {}

			// Once we detect that a sidebar element is being moved over the canvas
			// we create the spacer using the sidebar elements id with a spacer suffix and add into the
			// elements array so that it'll be rendered on the canvas.

			// CLONING
			// This is where the clone occurs. We're taking the id that was assigned to
			// sidebar element and reusing it for the spacer that we insert to the canvas.

			if (!activeData?.fromSidebar) {
				return
			}

			const overData = over?.data?.current ?? {}

			if (!spacerInsertedRef.current) {
				const spacerId = active.id + '-spacer'
				const spacer = createSpacer(spacerId)

				updateData(draft => {
					if (!draft.elements.length) {
						draft.elements.push(spacer)
					} else {
						const nextIndex =
							overData.index > -1 ? overData.index : draft.elements.length

						draft.elements.splice(nextIndex, 0, spacer)
					}
					spacerInsertedRef.current = true
				})
			} else if (!over) {
				// This solves the issue where you could have a spacer handing out in the canvas if you drug
				// a sidebar item on and then off
				updateData(draft => {
					draft.elements = draft.elements.filter(el => el.type !== 'spacer')
				})
				spacerInsertedRef.current = false
			} else {
				// Since we're still technically dragging the sidebar draggable and not one of the sortable draggables
				// we need to make sure we're updating the spacer position to reflect where our drop will occur.
				// We find the spacer and then swap it with the over skipping the op if the two indexes are the same
				updateData(draft => {
					const spacerIndex = draft.elements.findIndex(
						el => el.id === active.id + '-spacer'
					)

					const nextIndex =
						overData.index > -1 ? overData.index : draft.elements.length - 1

					if (nextIndex === spacerIndex) {
						return
					}

					draft.elements = arrayMove(
						draft.elements,
						spacerIndex,
						overData.index
					)
				})
			}
		},
		[updateData]
	)

	const handleDragEnd = useCallback(
		(e: DragEndEvent) => {
			const { over } = e

			// We dropped outside of the over so clean up so we can start fresh.
			if (!over) {
				cleanUp()
				updateData(draft => {
					draft.elements = draft.elements.filter(el => el.type !== 'spacer')
				})
				return
			}

			// This is where we commit the clone.
			// We take the element from the this ref and replace the spacer we inserted.
			// Since the ref just holds a reference to a element that the context is aware of
			// we just swap out the spacer with the referenced element.
			const nextElement = currentDragElementRef.current

			if (nextElement) {
				const overData = over?.data?.current ?? {}

				updateData(draft => {
					const spacerIndex = draft.elements.findIndex(
						el => el.type === 'spacer'
					)
					draft.elements.splice(spacerIndex, 1, nextElement)

					draft.elements = arrayMove(
						draft.elements,
						spacerIndex,
						overData.index || 0
					)
				})
			}

			setSidebarRegKey(Date.now())
			cleanUp()
		},
		[cleanUp, updateData]
	)

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
