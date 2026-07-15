"use client";

import { useState } from "react";
import { ArrowRight, Mail, CheckCircle2, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSubscribe } from "@/hooks/useSubscribers";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { mutateAsync: subscribe, isPending, isSuccess, reset } = useSubscribe();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) return;

    setError(null);

    try {
      await subscribe({ email });
      setEmail("");

      setTimeout(() => {
        reset();
      }, 3000);
    } catch {
      setError("Abunəlik uğursuz oldu. Yenidən cəhd edin.");
    }
  };

  return (
    <section id="abune" className="py-16 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-lg border border-border bg-card p-8 md:p-12 lg:p-16">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            {/* Description */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex rounded bg-accent/10 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.25em] text-accent">
                Bülleten
              </span>

              <h2 className="font-sans text-3xl font-black leading-tight text-foreground md:text-4xl">
                Həftəlik ən vacib biznes analitikası e-poçtunuzda.
              </h2>

              <p className="font-sans text-sm leading-6 text-muted-foreground max-w-xl">
                Biznes liderləri, sahibkarlar və maliyyə peşəkarları üçün həftəlik icmal, analizlər və özəl hesabatlar. Spam yoxdur, istənilən vaxt çıxa bilərsiniz.
              </p>

              <div className="flex flex-wrap gap-6 pt-4 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  Pulsuz abunə
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  Həftədə 1 dəfə
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  Şəxsi məlumat qorunması
                </div>
              </div>
            </div>

            {/* Input Form Block */}
            <div className="lg:col-span-5 flex items-center w-full">
              {isSuccess ? (
                <div className="w-full rounded-lg border border-accent/20 bg-accent/5 p-8 text-center animate-in fade-in zoom-in-95 duration-200">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-accent" />

                  <h3 className="mt-5 text-xl font-bold text-foreground">Abunə tamamlandı</h3>

                  <p className="mt-2 text-xs text-muted-foreground font-mono">
                    Təşəkkür edirik. İlk icmalı bazar ertəsi günü alacaqsınız.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="w-full rounded-lg border border-border bg-card p-6 md:p-8 space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded bg-accent/10 p-2.5">
                      <Mail className="h-5 w-5 text-accent" />
                    </div>

                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
                        Poçt qutusu
                      </h3>
                      <p className="text-[11px] text-muted-foreground">
                        E-poçt ünvanınızı daxil edin.
                      </p>
                    </div>
                  </div>

                  <Input
                    type="email"
                    placeholder="ad@shirket.az"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 border-border focus-visible:ring-accent"
                  />

                  <button
                    type="submit"
                    disabled={isPending}
                    className="flex h-12 w-full items-center justify-center gap-2 rounded bg-primary text-xs font-bold uppercase tracking-[0.15em] text-primary-foreground transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:opacity-60"
                  >
                    {isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        Abunə ol
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>

                  {error && (
                    <p className="text-[10px] font-medium text-destructive text-center">
                      {error}
                    </p>
                  )}

                  <p className="text-[10px] text-muted-foreground font-mono text-center">
                    Abunə olmaqla gizlilik şərtlərini qəbul edirsiniz.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
