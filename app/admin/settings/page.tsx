import Link from "next/link";
import { Save, Globe, Mail, Phone, MapPin } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Sayt Ayarları
          </h1>

          <p className="mt-2 text-muted-foreground">
            Ümumi sistem parametrlərini idarə edin.
          </p>
        </div>

        <Link
          href="#"
          className="inline-flex items-center rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
        >
          <Save className="mr-2 h-4 w-4" />
          Dəyişiklikləri saxla
        </Link>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="mb-8">
          <TabsTrigger value="general">Ümumi</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="social">Sosial</TabsTrigger>
          <TabsTrigger value="contact">Əlaqə</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="rounded-2xl border border-border bg-card p-8 space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Sayt adı
              </label>

              <Input defaultValue="Capitalist" />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Slogan
              </label>

              <Input defaultValue="Biznes • Maliyyə • Texnologiya" />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Logo URL
              </label>

              <Input placeholder="https://..." />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Favicon URL
              </label>

              <Input placeholder="https://..." />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="seo">
          <div className="rounded-2xl border border-border bg-card p-8 space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Meta Title
              </label>

              <Input />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Meta Description
              </label>

              <Textarea rows={5} />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Açar sözlər
              </label>

              <Input placeholder="biznes, startup, finance..." />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Google Analytics ID
              </label>

              <Input placeholder="G-XXXXXXXXXX" />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="social">
          <div className="rounded-2xl border border-border bg-card p-8 space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Facebook
              </label>

              <Input />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Instagram
              </label>

              <Input />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                X (Twitter)
              </label>

              <Input />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                LinkedIn
              </label>

              <Input />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                YouTube
              </label>

              <Input />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="contact">
          <div className="rounded-2xl border border-border bg-card p-8 space-y-6">
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium">
                <Mail className="h-4 w-4" />
                Email
              </label>

              <Input defaultValue="info@capitalist.az" />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium">
                <Phone className="h-4 w-4" />
                Telefon
              </label>

              <Input defaultValue="+994 xx xxx xx xx" />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium">
                <MapPin className="h-4 w-4" />
                Ünvan
              </label>

              <Textarea rows={3} />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium">
                <Globe className="h-4 w-4" />
                Website
              </label>

              <Input defaultValue="https://capitalist.az" />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}