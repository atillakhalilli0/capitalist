"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useCreateContactRequest } from "@/hooks/useContactRequests";

export default function ContactPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { mutateAsync: createContactRequest, isPending, isSuccess } = useCreateContactRequest();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!fullName.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setError("Bütün xanaları doldurun.");
      return;
    }

    setError(null);

    try {
      await createContactRequest({ fullName, email, subject, message });
      setFullName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch {
      setError("Mesaj göndərilmədi, yenidən cəhd edin.");
    }
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-16">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">
            Əlaqə
          </span>

          <h1 className="mt-4 text-4xl font-bold">Bizimlə əlaqə saxlayın</h1>

          <p className="mt-6 text-muted-foreground leading-7">
            Xəbər, əməkdaşlıq, reklam və ya digər suallarınız üçün bizimlə əlaqə saxlaya bilərsiniz.
          </p>

          <div className="mt-10 space-y-6">
            <div>
              <h3 className="font-semibold">Email</h3>
              <p className="text-muted-foreground">hello@capitalist.az</p>
            </div>

            <div>
              <h3 className="font-semibold">Telefon</h3>
              <p className="text-muted-foreground">+994 12 000 00 00</p>
            </div>

            <div>
              <h3 className="font-semibold">Ünvan</h3>
              <p className="text-muted-foreground">Bakı, Azərbaycan</p>
            </div>
          </div>
        </div>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-emerald-600/30 bg-emerald-600/5 p-8 text-center">
            <CheckCircle2 className="h-12 w-12 text-emerald-600" />
            <h3 className="mt-5 text-xl font-bold">Mesajınız göndərildi</h3>
            <p className="mt-2 text-muted-foreground">Tezliklə sizinlə əlaqə saxlayacağıq.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-border p-8">
            <Input
              placeholder="Ad və soyad"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />

            <Input
              type="email"
              placeholder="Email ünvanı"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              placeholder="Mövzu"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />

            <Textarea
              rows={7}
              placeholder="Mesajınız..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />

            {error && <p className="text-sm font-medium text-destructive">{error}</p>}

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Göndər"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
