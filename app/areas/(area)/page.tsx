export default async function AreaPage({
  params,
}: {
  params: Promise<{ area: string }>;
}) {
  const { area: key } = await params;

  return <div>You are in the area {key}</div>;
}
