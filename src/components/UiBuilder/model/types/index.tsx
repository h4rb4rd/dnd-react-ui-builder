import { UniqueIdentifier } from '@dnd-kit/core'
import { JSX } from 'react'

export type TElementType =
	| 'input'
	| 'select'
	| 'text'
	| 'button'
	| 'textarea'
	| 'spacer'

export type TSidebarElement = { type: TElementType; title: string }
export type TElementsMapItem = { [K in TElementType]: JSX.Element }
export type TDragElement = {
	id: UniqueIdentifier
	type: TElementType
	name: string
	parent: null
}
