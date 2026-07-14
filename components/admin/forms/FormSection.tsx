type FormSectionProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export default function FormSection({
  title,
  description,
  children,
}: FormSectionProps) {
  return (
    <section className="rounded-2xl border bg-background p-6 shadow-sm">
      <div className="mb-6 border-b pb-4">
        <h2 className="text-xl font-semibold tracking-tight">
          {title}
        </h2>

        {description && (
          <p className="mt-1 text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      <div>{children}</div>
    </section>
  );
}