"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import FormSection from "./FormSection";
import CoverImageField from "./CoverImageField";
import SeoFields from "./SeoFields";
import PublishFields from "./PublishFields";

import RichTextEditor from "@/components/admin/editor/RichTextEditor";

export type ContentType = "article" | "podcast" | "project";

export type ContentMode = "create" | "edit";

type ContentFormProps = {
  type: ContentType;
  mode?: ContentMode;
};

export default function ContentForm({
  type,
  mode = "create",
}: ContentFormProps) {
  const isArticle = type === "article";
  const isPodcast = type === "podcast";
  const isProject = type === "project";

  return (
    <Tabs defaultValue="general" className="space-y-6">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="general">Ümumi</TabsTrigger>
        <TabsTrigger value="media">Media</TabsTrigger>
        <TabsTrigger value="seo">SEO</TabsTrigger>
        <TabsTrigger value="publish">Paylaşım</TabsTrigger>
      </TabsList>

      <TabsContent value="general">
        <FormSection
          title={
            mode === "create"
              ? "Yeni məzmun"
              : "Məzmunu redaktə et"
          }
          description="Əsas məlumatları daxil edin."
        >
          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Başlıq
              </label>

              <input
                className="w-full rounded-xl border px-4 py-2"
                placeholder="Başlıq..."
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Slug
              </label>

              <input
                className="w-full rounded-xl border px-4 py-2"
                placeholder="slug"
              />
            </div>

            {isArticle && (
              <>
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Kateqoriya
                  </label>

                  <select className="w-full rounded-xl border px-4 py-2">
                    <option>Kateqoriya seçin</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Teqlər
                  </label>

                  <input
                    className="w-full rounded-xl border px-4 py-2"
                    placeholder="AI, Biznes..."
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Oxuma müddəti
                  </label>

                  <input
                    type="number"
                    className="w-full rounded-xl border px-4 py-2"
                  />
                </div>
              </>
            )}

            {isPodcast && (
              <>
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Aparıcı
                  </label>

                  <input
                    className="w-full rounded-xl border px-4 py-2"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Qonaq
                  </label>

                  <input
                    className="w-full rounded-xl border px-4 py-2"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Audio URL
                  </label>

                  <input
                    className="w-full rounded-xl border px-4 py-2"
                  />
                </div>
              </>
            )}

            {isProject && (
              <>
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Sponsor
                  </label>

                  <input
                    className="w-full rounded-xl border px-4 py-2"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Başlama tarixi
                  </label>

                  <input
                    type="date"
                    className="w-full rounded-xl border px-4 py-2"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Bitmə tarixi
                  </label>

                  <input
                    type="date"
                    className="w-full rounded-xl border px-4 py-2"
                  />
                </div>
              </>
            )}

            <div>
              <label className="mb-2 block text-sm font-medium">
                Məzmun
              </label>

              <RichTextEditor />
            </div>
          </div>
        </FormSection>
      </TabsContent>

      <TabsContent value="media">
        <CoverImageField />
      </TabsContent>

      <TabsContent value="seo">
        <SeoFields />
      </TabsContent>

      <TabsContent value="publish">
        <PublishFields />
      </TabsContent>
    </Tabs>
  );
}