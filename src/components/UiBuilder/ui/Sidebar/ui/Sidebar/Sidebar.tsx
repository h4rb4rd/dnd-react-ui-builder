import { sidebarElements } from '../../../../model/constants'
import { DraggableElement } from '../DraggableElement/DraggableElement'

import cls from './Sidebar.module.scss'

interface SidebarProps {
	sidebarRegKey: number
}

export const Sidebar = (props: SidebarProps) => {
	const { sidebarRegKey } = props

	return (
		<div key={sidebarRegKey} className={cls.sidebar}>
			{sidebarElements.map(el => (
				<DraggableElement key={el.type} element={el} />
			))}
		</div>
	)
}
