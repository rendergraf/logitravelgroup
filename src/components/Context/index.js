import React, { createContext, useState, useRef } from "react";
import { useDisclosure } from "@chakra-ui/react";
import useLocalStorage from "./useLocalStorage";

const TodoContext = createContext();
TodoContext.displayName = "TodoContext";

const TodoProvider = (props) => {
  const [actionHistory, setActionHistory] = useState([]);
  const [selectedTodos, setSelectedTodos] = useState([]);

  const deleteSelectedTodos = () => {
    const todosToDelete = todos.filter((todo) =>
      selectedTodos.includes(todo.text)
    );
    // Guarda una copia de las tareas a borrar en el historial
    setActionHistory([
      ...actionHistory,
      [...todosToDelete.map((todo) => ({ ...todo }))],
    ]);

    const newTodos = todos.filter((todo) => !selectedTodos.includes(todo.text));
    saveTodos(newTodos);
    setSelectedTodos([]);
  };

  // selección/deselección de una tarea
  const toggleSelectedTodo = (text) => {
    setSelectedTodos((prevSelected) => {
      if (prevSelected.includes(text)) {
        return prevSelected.filter((selected) => selected !== text);
      } else {
        return [...prevSelected, text];
      }
    });
  };

  const undoLastDelete = () => {
    const updatedHistory = [...actionHistory];
    const lastAction = updatedHistory.pop();
    if (lastAction) {
      const currentTodos = todos;
      const restoredTodos = currentTodos.concat(lastAction);
      saveTodos(restoredTodos);
    }
    setActionHistory(updatedHistory);
  };

  const {
    item: todos,
    saveItem: saveTodos,
    loading,
    error,
  } = useLocalStorage("TODOS_V1", []);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  // Busca el indice del Todo
  const searcIndex = (text) => {
    return todos.findIndex((todo) => todo.text.includes(text));
  };

  // Borramos un Todo
  const deleteTodo = (text) => {
    const todoIndex = searcIndex(text);
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  };
  // crearTodo
  const crearTodo = (text) => {
    const newTodos = [...todos];
    newTodos.push({
      text: text,
    });
    saveTodos(newTodos);
  };
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
        initialRef,
        finalRef,
        crearTodo,
        actionHistory,
        undoLastDelete,
        deleteSelectedTodos,
        selectedTodos,
        toggleSelectedTodo,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};

export { TodoContext, TodoProvider };
