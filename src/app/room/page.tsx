export default async function Movie({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <main className="flex min-h-[calc(100vh-var(--header-height))] flex-col items-center justify-center bg-linear-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <p>Room {slug}</p>
        <p>Please select a seat for your reservation.</p>
      </div>
    </main>
  );
}
