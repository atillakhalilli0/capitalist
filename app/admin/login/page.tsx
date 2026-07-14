"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
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

import { useLogin } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/authStore";

const schema = z.object({
  email: z
    .string()
    .email("Düzgün e-poçt daxil edin."),

  password: z
    .string()
    .min(6, "Şifrə minimum 6 simvol olmalıdır."),
});

type FormValues = z.infer<typeof schema>;

export default function AdminLoginPage() {
  const router = useRouter();

  const login = useLogin();

  const { login: saveAuth } = useAuthStore();

  const [showPassword, setShowPassword] =
    useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(
    values: FormValues
  ) {
    try {
      const response =
        await login.mutateAsync(values);

      saveAuth({
        user: response.user,
        accessToken:
          response.accessToken,
        refreshToken:
          response.refreshToken,
      });

      toast.success(
        "Giriş uğurla tamamlandı."
      );

      router.replace("/admin");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
        "Giriş mümkün olmadı."
      );
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold">
            Admin Panel
          </CardTitle>

          <CardDescription>
            Davam etmək üçün hesabınıza
            daxil olun.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
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

            <Button
              type="submit"
              className="w-full"
              disabled={login.isPending}
            >
              {login.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Giriş edilir...
                </>
              ) : (
                "Daxil ol"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}