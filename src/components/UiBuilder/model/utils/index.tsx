import { UniqueIdentifier } from '@dnd-kit/core'

import { elementsMap } from '../constants'
import { TCanvasElement, TElementType } from '../types'

export const getElement = (type: TElementType) => {
	if (type === 'spacer') {
		return <div className='spacer'>spacer</div>
	}

	return elementsMap[type] || <div>No renderer found for {type}</div>
}

export const createSpacer = (id: UniqueIdentifier): TCanvasElement => {
	return {
		id,
		type: 'spacer',
	}
}

export const replaceElement = (
	elements: TCanvasElement[],
	index: number,
	newItem: TCanvasElement
) => [...elements.slice(0, index), newItem, ...elements.slice(index + 1)]
