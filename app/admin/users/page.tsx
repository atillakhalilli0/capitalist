import Link from "next/link";
import Image from "next/image";
import { Eye, Pencil, Plus, Search, Users } from "lucide-react";

import { users } from "@/mocks/users";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AdminUsersPage() {
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
          className="inline-flex items-center rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
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
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>İstifadəçi</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Məqalələr</TableHead>
              <TableHead className="w-[140px]">
                Əməliyyat
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="relative h-11 w-11 overflow-hidden rounded-full bg-muted">
                      {user.avatar ? (
                        <Image
                          src={user.avatar}
                          alt={user.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <Users className="h-5 w-5 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    <div>
                      <p className="font-semibold">
                        {user.name} {user.surname}
                      </p>

                      {user.bio && (
                        <p className="line-clamp-1 text-xs text-muted-foreground">
                          {user.bio}
                        </p>
                      )}
                    </div>
                  </div>
                </TableCell>

                <TableCell>{user.email}</TableCell>

                <TableCell>{user.role}</TableCell>

                <TableCell>
                    -
                  {/* {user.articles?.length ?? 0} */}
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
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
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}