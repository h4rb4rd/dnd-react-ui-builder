import { UniqueIdentifier } from '@dnd-kit/core'

import { TCanvasElement, TElementsMapItem } from '../types'
import { Spacer } from '../../ui/Spacer/Spacer'

export const getElement = (
	type: string,
	elementsMap: Partial<TElementsMapItem>
) => {
	if (type === 'spacer') {
		return <Spacer />
	}

	return elementsMap[type] || <div>No renderer found for {type}</div>
}

export const createSpacer = (id: UniqueIdentifier): TCanvasElement => {
	return {
		id,
		type: 'spacer',
	}
}
