import { UniqueIdentifier } from '@dnd-kit/core'
import { JSX } from 'react'

export type TSidebarElement = { type: string; title: string }
export type TElementsMapItem = Record<string, JSX.Element>
export type TCanvasElement = {
	id: UniqueIdentifier
	type: string
}
