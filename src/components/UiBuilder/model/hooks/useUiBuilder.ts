import { useCallback, useRef, useState } from 'react'
import { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'

import { createSpacer } from '../../model/utils'
import { TCanvasElement, TSidebarElement } from '../../model/types'

export const useUiBuilder = (
	canvasElements: TCanvasElement[],
	onChange: (elements: TCanvasElement[]) => void
) => {
	const [sidebarRegKey, setSidebarRegKey] = useState(Date.now())
	const [activeSidebarElement, setActiveSidebarElement] =
		useState<TSidebarElement | null>(null) // only for elements from the sidebar
	const [activeCanvasElement, setActiveCanvasElement] =
		useState<TCanvasElement | null>(null) // only for elements that are in the form.
	const spacerInsertedRef = useRef(false)
	const currentDragElementRef = useRef<TCanvasElement | null>(null)

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
				}
				return
			}

			// We aren't creating a new element so go ahead and just insert the spacer
			// since this element already belongs to the canvas.
			const { element, index } = activeData

			setActiveCanvasElement(element)
			currentDragElementRef.current = element

			onChange(
				canvasElements.map((el, i) =>
					i === index ? createSpacer(active.id) : el
				)
			)
		},
		[canvasElements, onChange]
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

				let newElements = []

				if (!canvasElements.length) {
					newElements = [...canvasElements, spacer]
				} else {
					const nextIndex =
						overData.index > -1 ? overData.index : canvasElements.length

					newElements = [
						...canvasElements.slice(0, nextIndex),
						spacer,
						...canvasElements.slice(nextIndex),
					]
				}

				onChange(newElements)
				spacerInsertedRef.current = true
			} else if (!over) {
				// This solves the issue where you could have a spacer handing out in the canvas if you drug
				// a sidebar item on and then off
				onChange(canvasElements.filter(el => el.type !== 'spacer'))
				spacerInsertedRef.current = false
			} else {
				// Since we're still technically dragging the sidebar draggable and not one of the sortable draggables
				// we need to make sure we're updating the spacer position to reflect where our drop will occur.
				// We find the spacer and then swap it with the over skipping the op if the two indexes are the same

				const spacerIndex = canvasElements.findIndex(
					el => el.id === active.id + '-spacer'
				)

				const nextIndex =
					overData.index > -1 ? overData.index : canvasElements.length - 1

				if (nextIndex === spacerIndex) {
					return
				}

				onChange(arrayMove(canvasElements, spacerIndex, overData.index))
			}
		},
		[canvasElements, onChange]
	)

	const handleDragEnd = useCallback(
		(e: DragEndEvent) => {
			const { over } = e

			// We dropped outside of the over so clean up so we can start fresh.
			if (!over) {
				cleanUp()
				onChange(canvasElements.filter(el => el.type !== 'spacer'))
				return
			}

			// This is where we commit the clone.
			// We take the element from the this ref and replace the spacer we inserted.
			// Since the ref just holds a reference to a element that the context is aware of
			// we just swap out the spacer with the referenced element.
			const nextElement = currentDragElementRef.current

			if (nextElement) {
				const overData = over?.data?.current ?? {}

				const spacerIndex = canvasElements.findIndex(el => el.type === 'spacer')

				const splicedElements = canvasElements.map((el, i) =>
					i === spacerIndex ? nextElement : el
				)

				onChange(arrayMove(splicedElements, spacerIndex, overData.index || 0))
			}

			setSidebarRegKey(Date.now())
			cleanUp()
		},
		[canvasElements, onChange, cleanUp]
	)

	return {
		activeSidebarElement,
		activeCanvasElement,
		sidebarRegKey,
		handleDragStart,
		handleDragOver,
		handleDragEnd,
	}
}
