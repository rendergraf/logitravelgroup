import { useState, useEffect } from "react";
import type { UseLocalStorageResult } from "../../Types";

const useLocalStorage = <T>(itemName: string, initialValue: T): UseLocalStorageResult<T> => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [todos, setTodos] = useState<T>(initialValue);
  let parseItem: T;

  useEffect(() => {
    try {
      const localStorageItem = localStorage.getItem(itemName);

      if (!localStorageItem) {
        localStorage.setTodos(itemName, JSON.stringify(initialValue));
        parseItem = initialValue;
      } else {
        parseItem = JSON.parse(localStorageItem);
      }

      if (JSON.stringify(parseItem) !== JSON.stringify(todos)) {
        setTodos(parseItem);
      }

      setLoading(false);
    } catch (error) {
      const newErrorMessage = `Error: ${error?.message || error}`;
      if (newErrorMessage !== error) {
        setError(newErrorMessage);
      }
    }
  }, [itemName, initialValue, todos]);


  const saveTodos: UseLocalStorageResult<T>["saveTodos"] = (newItem) => {
    try {
      localStorage.setItem(itemName, JSON.stringify(newItem));
      setTodos(newItem);
    } catch (error) {
      setError(`Error saving item: ${error?.message || error}`);
    }
  };

  return {
    todos,
    saveTodos,
    loading,
    error,
  };
};

export default useLocalStorage;
