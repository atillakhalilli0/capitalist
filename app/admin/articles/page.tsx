import Link from "next/link";
import { Eye, Pencil, Plus, Search } from "lucide-react";

import { articles as allArticles } from "@/mocks/articles";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function AdminArticlesPage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Məqalələr
                    </h1>

                    <p className="mt-2 text-muted-foreground">
                        Bütün məqalələri idarə edin.
                    </p>
                </div>

                <Link
                    href="/admin/articles/create"
                    className={cn(buttonVariants())}
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Yeni məqalə
                </Link>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
                <div className="relative mb-6 max-w-md">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                        placeholder="Məqalə axtar..."
                        className="pl-10"
                    />
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Başlıq</TableHead>
                            <TableHead>Kateqoriya</TableHead>
                            <TableHead>Müəllif</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Baxış</TableHead>
                            <TableHead className="w-[130px]">
                                Əməliyyat
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {allArticles.map((article) => (
                            <TableRow key={article.id}>
                                <TableCell className="max-w-md">
                                    <div>
                                        <p className="line-clamp-1 font-semibold">
                                            {article.title}
                                        </p>

                                        <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                                            {article.slug}
                                        </p>
                                    </div>
                                </TableCell>

                                <TableCell>
                                    {article.category.name}
                                </TableCell>

                                <TableCell>
                                    {article.author.name}{" "}
                                    {article.author.surname}
                                </TableCell>

                                <TableCell>
                                    <Badge variant="secondary">
                                        {article.status}
                                    </Badge>
                                </TableCell>

                                <TableCell>
                                    {article.viewCount.toLocaleString()}
                                </TableCell>

                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Link
                                            href={`/admin/articles/${article.id}`}
                                            className={cn(buttonVariants())}
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Link>
                                        <Link
                                            href={`/admin/articles/${article.id}/edit`}
                                            className={cn(buttonVariants())}
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Link>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}