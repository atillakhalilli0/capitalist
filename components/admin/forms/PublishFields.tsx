"use client";

import { useState } from "react";

import FormSection from "./FormSection";
import StatusSelect from "./StatusSelect";
import DatePickerField from "./DatePickerField";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export default function PublishFields() {
  const [status, setStatus] = useState<
    "draft" | "review" | "published" | "archived"
  >("draft");

  const [publishDate, setPublishDate] = useState<Date>();

  return (
    <FormSection
      title="Paylaşım"
      description="Məzmunun yayımlanma parametrlərini idarə edin."
    >
      <div className="space-y-8">
        <StatusSelect
          value={status}
          onValueChange={setStatus}
        />

        <DatePickerField
          label="Yayımlanma tarixi"
          value={publishDate}
          onChange={setPublishDate}
        />

        <div className="space-y-2">
          <Label htmlFor="author">
            Müəllif
          </Label>

          <Input
            id="author"
            placeholder="Müəllif seçin"
          />
        </div>

        <div className="flex items-center justify-between rounded-xl border p-4">
          <div>
            <Label htmlFor="featured">
              Redaktorun seçimi
            </Label>

            <p className="text-sm text-muted-foreground">
              Ana səhifədə Editors Pick bölməsində göstərilsin.
            </p>
          </div>

          <Switch id="featured" />
        </div>

        <div className="flex items-center justify-between rounded-xl border p-4">
          <div>
            <Label htmlFor="breaking">
              Son dəqiqə xəbəri
            </Label>

            <p className="text-sm text-muted-foreground">
              News ticker-də göstərilsin.
            </p>
          </div>

          <Switch id="breaking" />
        </div>

        <div className="flex items-center gap-3 rounded-xl border p-4">
          <Checkbox id="comments" />

          <div>
            <Label htmlFor="comments">
              Şərhlərə icazə ver
            </Label>

            <p className="text-sm text-muted-foreground">
              İstifadəçilər bu məzmuna rəy yaza biləcəklər.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl border p-4">
          <Checkbox id="notify" />

          <div>
            <Label htmlFor="notify">
              Bildiriş göndər
            </Label>

            <p className="text-sm text-muted-foreground">
              Dərc ediləndə istifadəçilərə notification göndərilsin.
            </p>
          </div>
        </div>
      </div>
    </FormSection>
  );
}