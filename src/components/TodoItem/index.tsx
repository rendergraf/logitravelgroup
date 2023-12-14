import React, { useContext } from "react";
import { Flex, Stack, Text, Checkbox, Box } from "@chakra-ui/react";
import { TodoContext } from "../Context";
import { motion } from "framer-motion";
import type { TodoItemProps } from "../../Types";

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { toggleSelectedTodo, selectedTodos } = useContext(TodoContext);

  const isSelected = selectedTodos.includes(todo.text);

  const handleCheckboxChange = () => {
    toggleSelectedTodo(todo.text);
  };

  return (
    <Stack
      as={motion.div}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      direction="row"
      justifyContent={"space-between"}
      width="100%"
    >
      <Flex alignItems={"baseline"} width="100%">
        <Box
          as="label"
          width="100%"
          cursor="pointer"
          backgroundColor={isSelected ? "todo.500" : "transparent"}
          color={isSelected ? "todo.50" : "black"}
          borderRadius="0"
          p="2"
        >
          <Checkbox
            display="none"
            isChecked={isSelected}
            onChange={handleCheckboxChange}
          />
          <Text>{todo.text}</Text>
        </Box>
      </Flex>
    </Stack>
  );
};

export default TodoItem;
