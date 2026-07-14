"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import FormSection from "./FormSection";

export default function SeoFields() {
  return (
    <FormSection
      title="SEO"
      description="Axtarış sistemləri və sosial şəbəkələr üçün optimizasiya parametrləri."
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="seo-title">
            SEO Başlıq
          </Label>

          <Input
            id="seo-title"
            placeholder="SEO başlığını daxil edin"
            maxLength={60}
          />

          <p className="text-xs text-muted-foreground">
            Tövsiyə olunan uzunluq: 50–60 simvol.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="seo-description">
            SEO Təsviri
          </Label>

          <Textarea
            id="seo-description"
            rows={4}
            maxLength={160}
            placeholder="Qısa SEO təsviri yazın"
          />

          <p className="text-xs text-muted-foreground">
            Tövsiyə olunan uzunluq: 140–160 simvol.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="seo-keywords">
            Açar sözlər
          </Label>

          <Input
            id="seo-keywords"
            placeholder="texnologiya, AI, startup"
          />

          <p className="text-xs text-muted-foreground">
            Vergüllə ayırın.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="canonical-url">
            Canonical URL
          </Label>

          <Input
            id="canonical-url"
            placeholder="https://example.com/article"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="og-image">
            Open Graph şəkli
          </Label>

          <Input
            id="og-image"
            placeholder="https://..."
          />

          <p className="text-xs text-muted-foreground">
            Boş saxlanarsa üz qabığı şəkli istifadə olunacaq.
          </p>
        </div>
      </div>
    </FormSection>
  );
}