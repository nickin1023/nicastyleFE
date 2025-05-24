import { cn } from "@/src/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { ReactNode } from "react";

const badgeVariants = cva(
  `inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset`,
  {
    variants: {
      variant: {
        red: `bg-red-50  text-red-700 ring-red-600/10`,
        blue: `bg-blue-50 text-blue-700 ring-blue-700/10`
      }
    },
    defaultVariants: {
      variant: "red"
    }
  }
);

export type BadgeProps = {
  children: ReactNode;
} & VariantProps<typeof badgeVariants>;

export const Badge = ({ variant, children }: BadgeProps) => {
  return <span className={cn(badgeVariants({ variant }))}>{children}</span>;
};

Badge.displayName = "Badge";
