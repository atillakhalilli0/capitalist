"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreatePodcast } from "@/hooks/usePodcasts";

export default function CreatePodcastPage() {
  const router = useRouter();
  const { mutate: createPodcast, isPending } = useCreatePodcast();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [hostName, setHostName] = useState("");
  const [rssFeedUrl, setRssFeedUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !hostName.trim()) {
      toast.error("Başlıq, Təsvir və Aparıcı adları daxil edilməlidir");
      return;
    }

    createPodcast(
      {
        title,
        description,
        hostName,
        rssFeedUrl: rssFeedUrl || null,
        coverImageId: null, // Default to null since we do not require upload for simplicity
      },
      {
        onSuccess: () => {
          toast.success("Podcast uğurla yaradıldı");
          router.push("/admin/podcasts");
        },
        onError: (error: any) => {
          const detail = error?.response?.data?.detail || "Xəta baş verdi";
          toast.error(`Podcast yaradıla bilmədi: ${detail}`);
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-3xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/admin/podcasts"
            className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Podcastlara qayıt
          </Link>

          <h1 className="text-3xl font-bold">
            Yeni podcast
          </h1>

          <p className="mt-2 text-muted-foreground">
            Sistemə yeni podcast əlavə edin.
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
            Başlıq
          </label>
          <Input
            placeholder="Podcast başlığı..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Aparıcı
          </label>
          <Input
            placeholder="Aparıcı adı..."
            value={hostName}
            onChange={(e) => setHostName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            RSS Feed URL
          </label>
          <Input
            placeholder="https://..."
            value={rssFeedUrl}
            onChange={(e) => setRssFeedUrl(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Təsvir
          </label>
          <Textarea
            rows={5}
            placeholder="Podcast haqqında qısa məlumat..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
      </div>
    </form>
  );
}
