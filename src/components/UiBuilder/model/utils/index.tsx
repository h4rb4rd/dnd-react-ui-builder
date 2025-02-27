import { UniqueIdentifier } from '@dnd-kit/core'

import { elementsMap } from '../constants'
import { TCanvasElement, TElementType } from '../types'
import { Spacer } from '../../ui/Spacer/Spacer'

export const getElement = (type: TElementType) => {
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
