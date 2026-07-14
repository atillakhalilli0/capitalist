import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Haqqımızda",
  description: "Capitalist biznes media platforması haqqında.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-16">
      <div className="max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">
          Haqqımızda
        </span>

        <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
          Biznesi daha aydın izah edən media platforması
        </h1>

        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Capitalist Azərbaycanın biznes, iqtisadiyyat, maliyyə,
          texnologiya və startap ekosistemi haqqında operativ xəbərlər,
          dərin analitik yazılar və müsahibələr hazırlayan müstəqil media
          platformasıdır.
        </p>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-3">
        <div className="rounded-3xl border border-border p-8">
          <h2 className="text-xl font-semibold">Missiyamız</h2>

          <p className="mt-4 text-muted-foreground leading-7">
            Oxuculara etibarlı, dəqiq və praktik biznes informasiyası
            təqdim etmək.
          </p>
        </div>

        <div className="rounded-3xl border border-border p-8">
          <h2 className="text-xl font-semibold">Dəyərlərimiz</h2>

          <p className="mt-4 text-muted-foreground leading-7">
            Müstəqillik, şəffaflıq, faktlara əsaslanan jurnalistika və
            yüksək redaksiya standartları.
          </p>
        </div>

        <div className="rounded-3xl border border-border p-8">
          <h2 className="text-xl font-semibold">Oxucu üçün</h2>

          <p className="mt-4 text-muted-foreground leading-7">
            Vaxtınıza dəyər veririk. Mürəkkəb mövzuları sadə və dəqiq
            formada təqdim edirik.
          </p>
        </div>
      </div>
    </div>
  );
}