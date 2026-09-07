import type { DashboardCard } from "@/lib/schemas/dashboard-schema";
import { Item } from "@/components/cards/Item";
import { GroupCard } from "@/components/cards/Group";

type CardProps = {
  card: DashboardCard;
};

export const Card = ({ card }: CardProps) => {
  if (card.type !== "group") {
    return <Item item={card} />;
  }
  return <GroupCard item={card} />;
};
