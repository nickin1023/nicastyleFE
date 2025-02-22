import { cn } from "@/src/utils/cn";
import { cva, VariantProps } from "class-variance-authority";

const snackBarVariants = cva(
  `p-2 text-sm rounded-lg fixed min-w-[250px] dark:bg-gray-800 text-center top-4 left-1/2 transform -translate-x-1/2 z-50`,
  {
    variants: {
      variant: {
        success: `text-green-800 bg-green-50 dark:text-green-400`,
        warn: `text-red-800 bg-red-50 dark:text-red-400`
      }
    },
    defaultVariants: {
      variant: "success"
    }
  }
);

export type SnackbarProps = {
  isShow: boolean;
  message: string;
} & VariantProps<typeof snackBarVariants>;

export const Snackbar = ({ isShow, message, variant }: SnackbarProps) => {
  return (
    <>
      {isShow && (
        <div className={cn(snackBarVariants({ variant }))} role="alert">
          <div>{message}</div>
        </div>
      )}
    </>
  );
};

Snackbar.displayName = "Snackbar";
