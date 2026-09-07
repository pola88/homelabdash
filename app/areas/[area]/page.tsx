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
    <div className="m-4 flex flex-col gap-3">
      <h3>{config?.name}</h3>
      <div className="grid grid-cols-3 gap-4">
        {config?.cards.map((card, index) => (
          <Card key={`${card.type}-${index}`} card={card} />
        ))}
      </div>
    </div>
  );
}
