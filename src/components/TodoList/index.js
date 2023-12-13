import React, { useContext } from "react";
import {
  Box,
  Stack,
  Text,
  Skeleton,
  VStack,
  Heading,
  Button,
  IconButton,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { RepeatClockIcon, DeleteIcon } from "@chakra-ui/icons";
import { TodoContext } from "../Context";
import { TodoItem, ModalTodo } from "../../components";

const TodoList = () => {
  const {
    todos,
    error,
    loading,
    undoLastDelete,
    deleteSelectedTodos,
    selectedTodos,
    actionHistory,
  } = useContext(TodoContext);
  return (
    <Box rounded={"20px"} bg={"white"} boxShadow={"lg"} p={8} mt={10} mb={20}>
      <VStack spacing={2} textAlign="center">
        <Heading fontSize="2xl" fontWeight="bold">
          This is a technical proof
        </Heading>
        <Text fontSize="lg" color={"gray.900"}>
          Lorem ipsum dolor sit amet consectetur adipiscing, elit mus primis nec
          inceptos. Lacinia habitasse arcu molestie maecenas cursus quam nunc,
          hendrerit posuere augue fames dictumst placerat porttitor, dis mi
          pharetra vestibulum venenatis phasellus.
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
          <Text
            fontSize="lg"
            fontWeight="bold"
            align={"center"}
            padding={"11px"}
            margin={"20px 0"}
          >
            Not found any, add one using the ADD button.
          </Text>
        )}
        {todos.length > 0 && (
          <Flex
            alignItems={"baseline"}
            gap={"2px"}
            flexDir={"column"}
            padding={"11px"}
            margin={"20px 0"}
            bgColor={"todo.900"}
            border={"1px solid #ccc"}
          >
            {todos.map((todo, index) => {
              return <TodoItem key={index} todo={todo} />;
            })}
          </Flex>
        )}
        <Flex alignItems={"baseline"} gap={"15px"}>
          <IconButton
            icon={<RepeatClockIcon />}
            colorScheme="todo"
            onClick={undoLastDelete}
            isDisabled={!actionHistory.length || loading}
            variant="outline"
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
  );
};

export default TodoList;
