import type { GroupCard as IGroupCard } from "@/lib/schemas/dashboard-schema";
import { Item } from "@/components/cards/Item";
import { BaseCard } from "@/components/cards/Base";
import { Label } from "@/components/tremor/Label";

type GroupProps = {
  item: IGroupCard;
};

export const GroupCard = ({ item }: GroupProps) => {
  return (
    <BaseCard className="flex-col" layout={item.layout}>
      <Label className="text-base">{item.title}</Label>
      {item.cards.map((item, index) => (
        <Item key={index} item={item} asChild />
      ))}
    </BaseCard>
  );
};
