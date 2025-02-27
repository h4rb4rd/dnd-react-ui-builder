import { Fragment } from 'react'

import { getElement } from '../../model/utils'

import { TCanvasElement, TElementsMapItem } from '../../model/types'

import cls from './StaticContent.module.scss'

interface StaticContentProps {
	canvasElements: TCanvasElement[]
	elementsMap: Partial<TElementsMapItem>
}

export const StaticContent = (props: StaticContentProps) => {
	const { canvasElements, elementsMap } = props

	return (
		<div className={cls.container}>
			{canvasElements.map(element => (
				<Fragment key={element.id}>
					{getElement(element.type, elementsMap)}
				</Fragment>
			))}
		</div>
	)
}
