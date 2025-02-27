import {
	DragCancelEvent,
	DragEndEvent,
	DragMoveEvent,
	DragOverEvent,
	DragStartEvent,
	useDndMonitor,
} from '@dnd-kit/core'

const defaultAnnouncements = {
	onDragStart(e: DragStartEvent) {
		const { active } = e

		console.log(`Start: Picked up draggable item ${active?.id}.`)
	},
	onDragMove(e: DragMoveEvent) {
		const { active, over } = e

		if (over?.id) {
			console.log(
				`Move: Draggable item ${active?.id} was moved over droppable area ${over?.id}.`
			)
			return
		}

		console.log(
			`Move: Draggable item ${active?.id} is no longer over a droppable area.`
		)
	},
	onDragOver(e: DragOverEvent) {
		const { active, over } = e

		if (over?.id) {
			console.log(
				`Over: Draggable item ${active?.id} was moved over droppable area ${over?.id}.`
			)
			return
		}

		console.log(
			`Over: Draggable item ${active?.id} is no longer over a droppable area.`
		)
	},
	onDragEnd(e: DragEndEvent) {
		const { active, over } = e

		if (over?.id) {
			console.log(
				`End: Draggable item ${active?.id} was dropped over droppable area ${over?.id}`
			)
			return
		}

		console.log(`End: Draggable item ${active?.id} was dropped.`)
	},
	onDragCancel(e: DragCancelEvent) {
		const { active } = e

		console.log(
			`Cancel: Dragging was cancelled. Draggable item ${active?.id} was cancelled.`
		)
	},
}

export const Announcements = () => {
	useDndMonitor(defaultAnnouncements)

	return null
}
