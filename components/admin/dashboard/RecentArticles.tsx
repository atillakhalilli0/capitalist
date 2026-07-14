import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { articles as allArticles } from "@/mocks/articles";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const articles = [...allArticles]
  .sort((a, b) => b.viewCount - a.viewCount)
  .slice(0, 8);

export default function RecentArticles() {
  return (
    <div className="rounded-2xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border p-6">
        <div>
          <h2 className="text-xl font-bold">
            Son məqalələr
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Son əlavə olunan və redaktə edilən məqalələr
          </p>
        </div>

        <Link
          href="/admin/articles"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          Hamısına bax
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Başlıq</TableHead>
            <TableHead>Kateqoriya</TableHead>
            <TableHead>Müəllif</TableHead>
            <TableHead>Baxış</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {articles.map((article) => (
            <TableRow key={article.id}>
              <TableCell className="font-medium">
                <Link
                  href={`/admin/articles/${article.id}`}
                  className="hover:text-emerald-600"
                >
                  {article.title}
                </Link>
              </TableCell>

              <TableCell>
                {article.category.name}
              </TableCell>

              <TableCell>
                {article.author.name} {article.author.surname}
              </TableCell>

              <TableCell>
                {article.viewCount.toLocaleString()}
              </TableCell>

              <TableCell>
                <Badge variant="secondary">
                  {article.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}