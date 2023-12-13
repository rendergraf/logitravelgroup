import { useState, useEffect } from "react";

const useLocalStorage = (itenName, initialValue) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [item, setItem] = useState(initialValue);

	useEffect(() => {
		try {
			const localStorageItem = localStorage.getItem(itenName);
			let parseItem;

			if (!localStorageItem) {
				localStorage.setItem(itenName, JSON.stringify(initialValue));
				parseItem = initialValue;
			} else {
				parseItem = JSON.parse(localStorageItem);
			}

			setItem(parseItem);
			setLoading(false);
		} catch (error) {
			console.error(`Error in useLocalStorage: ${error.message}`);
			setError(`Error: ${error.message}`);
		}
	}, []);


  const saveItem = (newItem) => {
    try {
      localStorage.setItem(itenName, JSON.stringify(newItem));
      setItem(newItem);
    } catch (error) {
      setError(error);
    }
  };

  return {
    item,
    saveItem,
    loading,
    error,
  };
};

export default useLocalStorage;
