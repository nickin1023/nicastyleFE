import { useCallback, useState } from "react";

export const useErrorState = () => {
  const [isError, setIsError] = useState(false);

  const setErrorState = useCallback((value: string) => {
    setIsError(value !== "Success");
  }, []);

  return { isError, setErrorState };
};
