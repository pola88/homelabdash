import type { DashboardCard } from "@/lib/schemas/dashboard-schema";
import { Toggle } from "@/components/cards/Toggle";

type CardProps = {
  card: DashboardCard;
};

export const Card = ({ card }: CardProps) => {
  switch (card.type) {
    case "group":
      return "Group card";
    case "light":
    case "switch":
      return <Toggle entityId={card.entity!} label={card.label} />;
    case "motion":
      return "Motion Card";
    case "climate":
      return "Climate Card";
    case "metric":
      return "Metric Card";
    default:
      return "Not implemented";
  }
};
