"use client";

import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <section className="mt-20 overflow-hidden rounded-lg border border-border bg-card transition-colors duration-300">
      <div className="relative p-8 md:p-12">
        <div className="mx-auto max-w-3xl text-center space-y-6">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded bg-accent/10">
            <Mail className="h-6 w-6 text-accent" />
          </div>

          <h2 className="font-sans text-2xl font-black tracking-tight text-foreground md:text-3xl">
            Həftənin ən vacib biznes xəbərlərini qaçırmayın
          </h2>

          <p className="mx-auto max-w-xl font-sans text-sm leading-6 text-muted-foreground">
            Hər həftə seçilmiş analitika, bazar xəbərləri, startap yenilikləri və xüsusi hesabatlar birbaşa poçt qutunuza göndərilsin.
          </p>

          {subscribed ? (
            <div className="mx-auto max-w-md rounded-lg border border-accent/20 bg-accent/5 p-6 text-center animate-in fade-in zoom-in-95 duration-200">
              <CheckCircle2 className="mx-auto h-8 w-8 text-accent" />
              <h3 className="mt-3 text-lg font-bold text-foreground">
                Abunə tamamlandı
              </h3>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-poçt ünvanınız"
                className="h-12 border-border focus-visible:ring-accent"
              />

              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center gap-2 rounded bg-primary px-6 font-mono text-[10px] font-bold uppercase tracking-wider text-primary-foreground hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                Abunə ol
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          )}

          <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            Spam göndərmirik. İstənilən vaxt abunəliyi ləğv edə bilərsiniz.
          </p>
        </div>
      </div>
    </section>
  );
}