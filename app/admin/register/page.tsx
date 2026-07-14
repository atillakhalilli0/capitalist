"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { useRegister } from "@/hooks/useAuth";

// Mirrors the backend's RegisterCommand exactly - username, email,
// password are required; firstName/lastName are optional there too.
const schema = z.object({
  username: z
    .string()
    .min(3, "İstifadəçi adı minimum 3 simvol olmalıdır."),

  email: z
    .string()
    .email("Düzgün e-poçt daxil edin."),

  password: z
    .string()
    .min(6, "Şifrə minimum 6 simvol olmalıdır."),

  confirmPassword: z.string(),

  firstName: z.string().optional(),

  lastName: z.string().optional(),
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Şifrələr uyğun gəlmir.",
    path: ["confirmPassword"],
  }
);

type FormValues = z.infer<typeof schema>;

export default function AdminRegisterPage() {
  const router = useRouter();

  const register = useRegister();

  const [showPassword, setShowPassword] =
    useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),

    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    },
  });

  async function onSubmit(values: FormValues) {
    try {
      // Backend doesn't return tokens from /auth/register (200, no
      // body), so this does NOT log the user in - send them to the
      // login page to sign in with the account they just created.
      await register.mutateAsync({
        username: values.username,
        email: values.email,
        password: values.password,
        firstName: values.firstName || undefined,
        lastName: values.lastName || undefined,
      });

      toast.success(
        "Qeydiyyat uğurla tamamlandı. İndi daxil ola bilərsiniz."
      );

      router.replace("/admin/login");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
        error?.response?.data?.detail ??
        "Qeydiyyat mümkün olmadı."
      );
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold">
            Admin Qeydiyyatı
          </CardTitle>

          <CardDescription>
            Development üçün müvəqqəti səhifə - ilk istifadəçini
            burada yaradın.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username">İstifadəçi adı</Label>

              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                <Input
                  id="username"
                  type="text"
                  placeholder="admin"
                  className="pl-10"
                  {...form.register("username")}
                />
              </div>

              {form.formState.errors.username && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.username.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">E-poçt</Label>

              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  className="pl-10"
                  {...form.register("email")}
                />
              </div>

              {form.formState.errors.email && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            {/* First / last name */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Ad</Label>

                <Input
                  id="firstName"
                  type="text"
                  placeholder="Atilla"
                  {...form.register("firstName")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Soyad</Label>

                <Input
                  id="lastName"
                  type="text"
                  placeholder="Xəlilli"
                  {...form.register("lastName")}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Şifrə</Label>

              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  className="pl-10 pr-10"
                  {...form.register("password")}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              {form.formState.errors.password && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">
                Şifrəni təkrarla
              </Label>

              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  className="pl-10"
                  {...form.register("confirmPassword")}
                />
              </div>

              {form.formState.errors.confirmPassword && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={register.isPending}
            >
              {register.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Qeydiyyat edilir...
                </>
              ) : (
                "Qeydiyyatdan keç"
              )}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Artıq hesabınız var?{" "}
              <Link
                href="/admin/login"
                className="font-medium text-foreground underline underline-offset-4"
              >
                Daxil olun
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}