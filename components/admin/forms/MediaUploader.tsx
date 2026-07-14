"use client";

import Image from "next/image";
import { ImagePlus, Trash2 } from "lucide-react";
import { useRef } from "react";

import { Button } from "@/components/ui/button";

type MediaUploaderProps = {
  value?: string;
  onChange?: (file: File | null, preview: string | null) => void;
};

export default function MediaUploader({
  value,
  onChange,
}: MediaUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSelect(file: File) {
    const preview = URL.createObjectURL(file);
    onChange?.(file, preview);
  }

  function removeMedia() {
    if (inputRef.current) {
      inputRef.current.value = "";
    }

    onChange?.(null, null);
  }

  return (
    <div className="space-y-4">
      <input
        ref={inputRef}
        hidden
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (file) {
            handleSelect(file);
          }
        }}
      />

      {value ? (
        <div className="relative overflow-hidden rounded-xl border">
          <Image
            src={value}
            alt="Media"
            width={1200}
            height={675}
            className="aspect-video w-full object-cover"
          />

          <Button
            type="button"
            size="icon"
            variant="destructive"
            className="absolute right-3 top-3"
            onClick={removeMedia}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex aspect-video w-full flex-col items-center justify-center rounded-xl border-2 border-dashed transition hover:border-primary hover:bg-muted/30"
        >
          <ImagePlus className="mb-3 h-10 w-10 text-muted-foreground" />

          <span className="font-medium">
            Şəkil yüklə
          </span>

          <span className="mt-1 text-sm text-muted-foreground">
            PNG, JPG, WEBP
          </span>
        </button>
      )}
    </div>
  );
}