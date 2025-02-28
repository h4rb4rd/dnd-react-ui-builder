import {
	TestButton,
	TestInput,
	TestSelect,
	TestText,
	TestTextarea,
} from '../../ui/TestComponents'
import { TElementsMapItem, TSidebarElement } from '../types'

export const sidebarElements: TSidebarElement[] = [
	{
		type: 'input',
		title: 'Text Input',
	},
	{
		type: 'select',
		title: 'Select',
	},
	{
		type: 'text',
		title: 'Text',
	},
	{
		type: 'button',
		title: 'Button',
	},
	{
		type: 'textarea',
		title: 'Text Area',
	},
]

export const elementsMap: Partial<TElementsMapItem> = {
	input: <TestInput />,
	textarea: <TestTextarea />,
	select: <TestSelect />,
	text: <TestText />,
	button: <TestButton />,
}
