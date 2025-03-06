import { SetAdminPostParams } from "@/server/types/entity/adminPost";
import { setBlog } from "@/src/features/administrator/blogs/api/blogs";
import { useSnackbar } from "@/src/hooks/useSnackbar";
import { useRouter } from "next/router";

export const useSendData = () => {
  const router = useRouter();
  const { openSnackBar } = useSnackbar();

  const sendData = async (setParams: SetAdminPostParams) => {
    const res = await setBlog(setParams);
    if (res.result === "Failure") {
      openSnackBar("更新に失敗しました。", "warn");
    } else {
      openSnackBar("更新に成功しました。", "success");
      router.reload();
    }
  };

  return { sendData };
};
