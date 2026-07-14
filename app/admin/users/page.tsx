"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, Pencil, Plus, Search, Users, Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUsers } from "@/hooks/useUsers";

export default function AdminUsersPage() {
  const { data, isLoading, isError } = useUsers();
  const [search, setSearch] = useState("");

  const items = data?.items || [];

  const filteredUsers = items.filter((user) =>
    `${user.name} ${user.surname}`.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-96 items-center justify-center text-destructive">
        İstifadəçilər yüklənərkən xəta baş verdi.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            İstifadəçilər
          </h1>

          <p className="mt-2 text-muted-foreground">
            Müəllifləri, redaktorları və administratorları idarə edin.
          </p>
        </div>

        <Link
          href="/admin/users/create"
          className="inline-flex items-center rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Yeni istifadəçi
        </Link>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="relative mb-6 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="İstifadəçi axtar..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>İstifadəçi</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead className="w-[140px] text-center">
                Əməliyyat
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                  İstifadəçi tapılmadı.
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-muted border">
                        <Users className="h-5 w-5 text-muted-foreground" />
                      </div>

                      <div>
                        <p className="font-semibold">
                          {user.name} {user.surname}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>

                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        href={`/admin/users/${user.id}`}
                        className="rounded-lg border border-border p-2 transition hover:bg-muted"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>

                      <Link
                        href={`/admin/users/${user.id}/edit`}
                        className="rounded-lg bg-primary p-2 text-primary-foreground transition hover:opacity-90"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}