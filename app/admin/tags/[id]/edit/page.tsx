"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { useTag, useUpdateTag } from "@/hooks/useTags";

type EditTagPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function EditTagPage({ params }: EditTagPageProps) {
  const { id } = use(params);
  const router = useRouter();

  const { data: tag, isLoading: isTagLoading } = useTag(id);
  const { mutate: updateTag, isPending } = useUpdateTag();

  const [name, setName] = useState("");

  useEffect(() => {
    if (tag) {
      setName(tag.name);
    }
  }, [tag]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Teq adı daxil edilməlidir");
      return;
    }

    updateTag(
      {
        id,
        data: { name },
      },
      {
        onSuccess: () => {
          toast.success("Teq məlumatları yeniləndi (lokal olaraq)");
          router.push("/admin/tags");
        },
        onError: (error: any) => {
          const detail = error?.response?.data?.detail || "Xəta baş verdi";
          toast.error(`Teq yenilənə bilmədi: ${detail}`);
        },
      }
    );
  };

  if (isTagLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!tag) {
    return (
      <div className="flex h-96 flex-col items-center justify-center gap-4 text-center">
        <p className="text-destructive font-medium">Teq tapılmadı</p>
        <Link href="/admin/tags" className="text-sm underline">
          Teqlərə qayıt
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/admin/tags"
            className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Teqlərə qayıt
          </Link>

          <h1 className="text-3xl font-bold">
            Teqi redaktə et
          </h1>

          <p className="mt-2 text-muted-foreground">
            Teq məlumatlarını yeniləyin.
          </p>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
        >
          {isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          Saxla
        </button>
      </div>

      <div className="rounded-2xl border border-border bg-card p-8 space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Teq adı
          </label>

          <Input
            placeholder="Teq adı..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
      </div>
    </form>
  );
}