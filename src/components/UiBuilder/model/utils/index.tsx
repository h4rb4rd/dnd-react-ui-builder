import { UniqueIdentifier } from '@dnd-kit/core'

import { elementsMap } from '../constants'
import { TDragElement, TElementType } from '../types'

export const getElement = (type: TElementType) => {
	if (type === 'spacer') {
		return <div className='spacer'>spacer</div>
	}

	return elementsMap[type] || <div>No renderer found for {type}</div>
}

export const createSpacer = (id: UniqueIdentifier): TDragElement => {
	return {
		id,
		type: 'spacer',
		name: 'spacer',
		parent: null,
	}
}

export const replaceElement = (
	elements: TDragElement[],
	index: number,
	newItem: TDragElement
) => [...elements.slice(0, index), newItem, ...elements.slice(index + 1)]
