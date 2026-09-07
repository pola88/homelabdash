import { Card } from "@/components/tremor/Card";
import { cx } from "@/lib/utils";

type BaseCardProp = {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
  layout?: "stack" | "grid";
};

export const BaseCard = ({
  children,
  className,
  asChild,
  layout = "grid",
}: BaseCardProp) => {
  const Component = asChild ? "div" : Card;
  return (
    <Component
      className={cx(
        "flex w-full gap-2",
        layout === "grid" ? "items-center" : "flex-col",
        asChild && "min-h-16",
        className,
      )}
    >
      {children}
    </Component>
  );
};
