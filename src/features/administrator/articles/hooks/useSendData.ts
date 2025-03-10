import { SetAdminPostParams } from "@/server/types/entity/adminPost";
import { setArticle } from "@/src/features/administrator/articles/api/articles";
import { useSnackbar } from "@/src/hooks/useSnackbar";
import { useRouter } from "next/router";

export const useSendData = () => {
  const router = useRouter();
  const { isShow, message, variant, openSnackBar } = useSnackbar();

  const sendData = async (setParams: SetAdminPostParams) => {
    const res = await setArticle(setParams);
    if (res.result === "Failure") {
      openSnackBar("更新に失敗しました。", "warn");
    } else {
      openSnackBar("更新に成功しました。", "success");
      router.reload();
    }
  };

  return { isShow, message, variant, sendData, openSnackBar };
};
