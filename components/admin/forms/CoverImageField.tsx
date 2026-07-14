"use client";

import Image from "next/image";
import { ImagePlus, Trash2 } from "lucide-react";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type CoverImageFieldProps = {
  value?: string;
  onChange?: (file: File | null) => void;
};

export default function CoverImageField({
  value,
  onChange,
}: CoverImageFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string | null>(
    value ?? null
  );

  function handleSelect(file: File) {
    setPreview(URL.createObjectURL(file));
    onChange?.(file);
  }

  function removeImage() {
    setPreview(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    onChange?.(null);
  }

  return (
    <div className="space-y-3">
      <Label>Üz qabığı şəkli</Label>

      <input
        ref={inputRef}
        hidden
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (!file) return;

          handleSelect(file);
        }}
      />

      {preview ? (
        <div className="relative overflow-hidden rounded-xl border">
          <Image
            src={preview}
            alt="Cover"
            width={1200}
            height={630}
            className="aspect-video h-auto w-full object-cover"
          />

          <Button
            type="button"
            size="icon"
            variant="destructive"
            className="absolute right-3 top-3"
            onClick={removeImage}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex aspect-video w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition hover:border-primary hover:bg-muted/40"
        >
          <ImagePlus className="mb-3 h-10 w-10 text-muted-foreground" />

          <p className="font-medium">
            Şəkil seç
          </p>

          <span className="text-sm text-muted-foreground">
            PNG, JPG, WEBP
          </span>
        </button>
      )}

      {preview && (
        <Button
          type="button"
          variant="outline"
          onClick={() => inputRef.current?.click()}
        >
          Şəkli dəyiş
        </Button>
      )}
    </div>
  );
}