import type { Metadata } from "next";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Əlaqə",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-16">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">
            Əlaqə
          </span>

          <h1 className="mt-4 text-4xl font-bold">
            Bizimlə əlaqə saxlayın
          </h1>

          <p className="mt-6 text-muted-foreground leading-7">
            Xəbər, əməkdaşlıq, reklam və ya digər suallarınız üçün
            bizimlə əlaqə saxlaya bilərsiniz.
          </p>

          <div className="mt-10 space-y-6">
            <div>
              <h3 className="font-semibold">Email</h3>
              <p className="text-muted-foreground">
                hello@capitalist.az
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Telefon</h3>
              <p className="text-muted-foreground">
                +994 12 000 00 00
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Ünvan</h3>
              <p className="text-muted-foreground">
                Bakı, Azərbaycan
              </p>
            </div>
          </div>
        </div>

        <form className="space-y-5 rounded-3xl border border-border p-8">
          <Input placeholder="Ad və soyad" />

          <Input
            type="email"
            placeholder="Email ünvanı"
          />

          <Input placeholder="Mövzu" />

          <Textarea
            rows={7}
            placeholder="Mesajınız..."
          />

          <Button className="w-full">
            Göndər
          </Button>
        </form>
      </div>
    </div>
  );
}