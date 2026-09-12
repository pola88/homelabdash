import type { GroupCard as IGroupCard } from "@/lib/schemas/dashboard-schema";
import { Item } from "@/components/cards/Item";
import { BaseCard } from "@/components/cards/Base";

type GroupProps = {
  item: IGroupCard;
};

export const GroupCard = ({ item }: GroupProps) => {
  return (
    <BaseCard className="flex-col" layout={item.layout}>
      <h3>{item.title}</h3>
      {item.cards.map((item, index) => (
        <Item key={index} item={item} asChild />
      ))}
    </BaseCard>
  );
};
