import { Dispatch, ReactNode, SetStateAction } from 'react'

interface Todo {
	text: string
}

interface TodoContextType {
	error: string | null
	loading: boolean
	todos: Todo[]
	saveTodos: (todos: Todo[]) => void
	deleteTodo: (text: string) => void
	isOpen: boolean
	onOpen: () => void
	onClose: () => void
	crearTodo: (text: string) => void
	actionHistory: Todo[][]
	undoLastDelete: () => void
	deleteSelectedTodos: () => void
	selectedTodos: string[]
	toggleSelectedTodo: (text: string) => void
}

interface SocialButtonProps {
	children: ReactNode
	label: string
	href: string
}

interface UseLocalStorageResult<T> {
	todos: T
	saveTodos: Dispatch<SetStateAction<T>>
	loading: boolean
	error: string | null
}

interface TodoItemProps {
	todo: Todo
}

export { Todo, TodoContextType, SocialButtonProps, UseLocalStorageResult, TodoItemProps }
