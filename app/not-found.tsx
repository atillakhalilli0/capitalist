import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import BackButton from "@/components/common/BackButton";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="mx-auto max-w-xl text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-600">
          Error 404
        </span>

        <h1 className="mt-4 text-6xl font-black tracking-tight">
          Səhifə tapılmadı
        </h1>

        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Axtardığınız səhifə silinmiş, köçürülmüş və ya ümumiyyətlə mövcud
          deyil.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700"
          >
            <Home className="h-4 w-4" />
            Ana səhifə
          </Link>

          <div className="   flex justify-center">
            <BackButton />
          </div>
        </div>
      </div>
    </main>
  );
}