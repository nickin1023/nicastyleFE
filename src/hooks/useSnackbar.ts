import { useEffect, useState } from "react";
import { SnackbarProps } from "../components/organisms/snackbar/Snackbar";

export const useSnackbar = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [variant, setVariant] = useState<SnackbarProps["variant"]>("success");

  useEffect(() => {
    if (isShow === true) {
      setTimeout(() => {
        setIsShow(false);
      }, 3000);
    }
  }, [isShow]);

  const openSnackBar = (msg: string, variant: SnackbarProps["variant"]) => {
    setMessage(msg);
    setIsShow(true);
    setVariant(variant);
  };

  return { isShow, message, variant, openSnackBar };
};
