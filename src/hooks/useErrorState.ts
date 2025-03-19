import { useCallback, useState } from "react";

export const useErrorState = (initialState?: boolean) => {
  const [isError, setIsError] = useState(initialState);

  const setErrorState = useCallback((value: string) => {
    setIsError(value !== "Success");
  }, []);

  return { isError, setErrorState };
};
