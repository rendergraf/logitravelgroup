import { useDisclosure } from '@chakra-ui/react'
import React, { FC, ReactNode, createContext, useRef, useState } from 'react'
import type { Todo, TodoContextType } from '../../Types'
import useLocalStorage from './useLocalStorage'

const TodoContext = createContext<TodoContextType>({
	error: null,
	loading: false,
	todos: [],
	saveTodos: () => {},
	deleteTodo: () => {},
	isOpen: false,
	onOpen: () => {},
	onClose: () => {},
	crearTodo: () => {},
	actionHistory: [],
	undoLastDelete: () => {},
	deleteSelectedTodos: () => {},
	selectedTodos: [],
	toggleSelectedTodo: () => {},
})
TodoContext.displayName = 'TodoContext'

const TodoProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const { todos, saveTodos, loading, error } = useLocalStorage('TODOS_V1', [] as Todo[])
	const [actionHistory, setActionHistory] = useState<Todo[][]>([])
	const [selectedTodos, setSelectedTodos] = useState<string[]>([])
	const { isOpen, onOpen, onClose } = useDisclosure()
	const initialRef = useRef<HTMLInputElement | null>(null)
	const finalRef = useRef<HTMLInputElement | null>(null)

	const deleteSelectedTodos = () => {
		const todosToDelete = todos.filter((todo) => selectedTodos.includes(todo.text)) as Todo[]
		// Guarda una copia de las tareas a borrar en el historial
		setActionHistory([...actionHistory, [...todosToDelete.map((todo) => ({ ...todo }))]])

		const newTodos = todos.filter((todo) => !selectedTodos.includes(todo.text))
		saveTodos(newTodos)
		setSelectedTodos([])
	}

	// selección/deselección de una tarea
	const toggleSelectedTodo = (text: string) => {
		setSelectedTodos((prevSelected) => {
			if (prevSelected.includes(text)) {
				return prevSelected.filter((selected) => selected !== text)
			}
			return [...prevSelected, text]
		})
	}

	const undoLastDelete = () => {
		const updatedHistory = [...actionHistory]
		const lastAction = updatedHistory.pop()
		if (lastAction) {
			const currentTodos = todos
			const restoredTodos = currentTodos.concat(lastAction)
			saveTodos(restoredTodos)
		}
		setActionHistory(updatedHistory)
	}

	// Busca el índice del Todo
	const searchIndex = (text: string) => {
		return todos.findIndex((todo) => todo.text.includes(text))
	}

	// Borramos un Todo
	const deleteTodo = (text: string) => {
		const todoIndex = searchIndex(text)
		const newTodos = [...todos]
		newTodos.splice(todoIndex, 1)
		saveTodos(newTodos)
	}
	// crearTodo
	const crearTodo = (text: string) => {
		const newTodos = [...todos]
		newTodos.push({
			text: text,
		})
		saveTodos(newTodos)
	}

	return (
		<TodoContext.Provider
			value={{
				error,
				loading,
				todos,
				saveTodos,
				deleteTodo,
				isOpen,
				onOpen,
				onClose,
				crearTodo,
				actionHistory,
				undoLastDelete,
				deleteSelectedTodos,
				selectedTodos,
				toggleSelectedTodo,
			}}
		>
			{children}
		</TodoContext.Provider>
	)
}

export { TodoContext, TodoProvider }
