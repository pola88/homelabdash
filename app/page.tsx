import { redirect } from "next/navigation";
import { getAreas } from "@/lib/dashboard-config";

export default function HomePage() {
  const areas = getAreas();
  redirect(`/areas/${areas[0].id}`);
}
