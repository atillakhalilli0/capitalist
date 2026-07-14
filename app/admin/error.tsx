"use client";

import { useEffect } from "react";
import { RefreshCcw } from "lucide-react";

type ErrorProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function Error({
  error,
  reset,
}: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-xl text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.28em] text-red-600">
          Xəta
        </span>

        <h1 className="mt-4 text-5xl font-black">
          Gözlənilməz problem baş verdi
        </h1>

        <p className="mt-6 text-muted-foreground">
          Səhifə yüklənərkən xəta yarandı.
          Yenidən cəhd edin.
        </p>

        <button
          onClick={reset}
          className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700"
        >
          <RefreshCcw className="h-4 w-4" />
          Yenidən cəhd et
        </button>
      </div>
    </main>
  );
}