export default function Loading() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 animate-pulse">
      <div className="h-10 w-2/3 rounded-xl bg-muted" />

      <div className="mt-8 h-[420px] rounded-3xl bg-muted" />

      <div className="mt-10 space-y-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-5 rounded bg-muted"
          />
        ))}
      </div>
    </main>
  );
}