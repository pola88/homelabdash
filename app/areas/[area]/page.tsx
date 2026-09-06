import { getAreaById } from "@/lib/dashboard-config";
import { Card } from "@/components/Card";

export default async function AreaPage({
  params,
}: {
  params: Promise<{ area: string }>;
}) {
  const { area } = await params;
  const config = getAreaById(area);
  return (
    <div>
      You are in the area {area}
      {config?.cards.map((card, index) => (
        <Card key={`${card.type}-${index}`} card={card} />
      ))}
    </div>
  );
}
