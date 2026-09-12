import type { DashboardCard } from "@/lib/schemas/dashboard-schema";
import { Light } from "@/components/cards/Light";
import { Motion } from "@/components/cards/Motion";

type ItemProps = {
  item: DashboardCard;
  asChild?: boolean;
};

export const Item = ({ item, asChild }: ItemProps) => {
  switch (item.type) {
    case "light":
    case "switch":
      return (
        <Light entityId={item.entity!} label={item.label} asChild={asChild} />
      );
    case "motion":
      return (
        <Motion entityId={item.entity!} label={item.label} asChild={asChild} />
      );
    case "climate":
      return "Climate Card";
    case "metric":
      return "Metric Card";
    default:
      return "Not implemented";
  }
};
