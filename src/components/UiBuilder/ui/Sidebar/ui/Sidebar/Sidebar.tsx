import { TSidebarElement } from '../../../../model/types'
import { DraggableElement } from '../DraggableElement/DraggableElement'

import cls from './Sidebar.module.scss'

interface SidebarProps {
	sidebarElements: TSidebarElement[]
	sidebarRegKey: number
}

export const Sidebar = (props: SidebarProps) => {
	const { sidebarElements, sidebarRegKey } = props

	return (
		<div key={sidebarRegKey} className={cls.sidebar}>
			{sidebarElements.map(el => (
				<DraggableElement key={el.type} element={el} />
			))}
		</div>
	)
}
