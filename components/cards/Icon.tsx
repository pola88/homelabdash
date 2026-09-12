import { cx } from "@/lib/utils";

type IconProps = {
  children: React.ReactNode;
  className?: string;
};

export const Icon = ({ children, className }: IconProps) => (
  <div
    className={cx(
      "rounded-pill flex h-9 w-9 items-center justify-center bg-neutral-200 text-neutral-400",
      className,
    )}
  >
    {children}
  </div>
);
