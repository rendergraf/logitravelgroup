import { DeleteIcon, RepeatClockIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Heading, IconButton, Skeleton, Spacer, Stack, Text, VStack } from '@chakra-ui/react'
import React, { FC, useContext } from 'react'
import { ModalTodo, TodoItem } from '..'
import type { TodoContextType } from '../../Types'
import { TodoContext } from '../Context'

const TodoList: FC = () => {
	const {
		todos = [],
		error,
		loading,
		undoLastDelete,
		deleteSelectedTodos,
		selectedTodos,
		actionHistory,
	} = useContext<TodoContextType>(TodoContext)
	return (
		<Box rounded={'20px'} bg={'white'} boxShadow={'lg'} p={8} mt={10} mb={20}>
			<VStack spacing={2} textAlign="center">
				<Heading fontSize="2xl" fontWeight="bold">
					This is a technical proof
				</Heading>
				<Text fontSize="lg" color={'gray.900'}>
					Lorem ipsum dolor sit amet consectetur adipiscing, elit mus primis nec inceptos. Lacinia habitasse arcu
					molestie maecenas cursus quam nunc, hendrerit posuere augue fames dictumst placerat porttitor, dis mi pharetra
					vestibulum venenatis phasellus.
				</Text>
			</VStack>
			<Stack spacing={4}>
				{error && <Text>Error: {error}</Text>}
				{loading && (
					<Stack>
						<Skeleton height="40px" />
						<Skeleton height="40px" />
						<Skeleton height="40px" />
						<Skeleton height="40px" />
					</Stack>
				)}
				{!todos.length && !loading && (
					<Text fontSize="lg" fontWeight="bold" align={'center'} padding={'11px'} margin={'20px 0'}>
						Not found any, add one using the ADD button.
					</Text>
				)}
				{todos.length > 0 && (
					<Flex
						alignItems={'baseline'}
						gap={'2px'}
						flexDir={'column'}
						padding={'11px'}
						margin={'20px 0'}
						bgColor={'todo.900'}
						border={'1px solid #ccc'}
					>
						{todos.map((todo, index) => (
							<TodoItem key={`todo_${index}`} todo={todo} />
						))}
					</Flex>
				)}
				<Flex alignItems={'baseline'} gap={'15px'}>
					<IconButton
						icon={<RepeatClockIcon />}
						colorScheme="todo"
						onClick={undoLastDelete}
						isDisabled={!actionHistory.length || loading}
						variant="outline"
						aria-label={'Undo'}
					/>
					<Button
						rightIcon={<DeleteIcon />}
						colorScheme="todo"
						onClick={deleteSelectedTodos}
						isDisabled={selectedTodos.length === 0}
						variant="outline"
					>
						Delete
					</Button>
					<Spacer />
					<ModalTodo />
				</Flex>
			</Stack>
		</Box>
	)
}

export default TodoList
