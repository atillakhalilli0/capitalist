import Image from "next/image";
import Link from "next/link";
import {
  ImageIcon,
  Plus,
  Search,
  Upload,
} from "lucide-react";

import { Input } from "@/components/ui/input";

const media = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  title: `Şəkil ${i + 1}`,
  url: `https://picsum.photos/600/400?random=${i + 100}`,
}));

export default function AdminMediaPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Media Kitabxanası
          </h1>

          <p className="mt-2 text-muted-foreground">
            Saytda istifadə olunan şəkilləri və media fayllarını idarə edin.
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="#"
            className="inline-flex items-center rounded-xl border border-border px-5 py-3 text-sm font-medium hover:bg-muted"
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </Link>

          <Link
            href="#"
            className="inline-flex items-center rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
          >
            <Plus className="mr-2 h-4 w-4" />
            Yeni media
          </Link>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          placeholder="Media axtar..."
          className="pl-10"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {media.map((item) => (
          <div
            key={item.id}
            className="overflow-hidden rounded-2xl border border-border bg-card"
          >
            <div className="relative aspect-video bg-muted">
              <Image
                src={item.url}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-3 p-4">
              <div className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-muted-foreground" />

                <p className="truncate font-medium">
                  {item.title}
                </p>
              </div>

              <div className="flex gap-2">
                <Link
                  href="#"
                  className="flex-1 rounded-lg border border-border px-3 py-2 text-center text-sm hover:bg-muted"
                >
                  Bax
                </Link>

                <Link
                  href="#"
                  className="flex-1 rounded-lg bg-primary px-3 py-2 text-center text-sm text-primary-foreground"
                >
                  Seç
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}