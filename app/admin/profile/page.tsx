"use client";

import { useEffect, useState } from "react";
import { Loader2, Save, KeyRound, User as UserIcon } from "lucide-react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useProfile, useChangePassword } from "@/hooks/useAuth";
import { useUpdateUser } from "@/hooks/useUsers";
import { useAuthStore } from "@/store/authStore";

export default function AdminProfilePage() {
  const { data: profile, isLoading, isError } = useProfile({ enabled: true });
  const { mutate: updateUser, isPending: isSaving } = useUpdateUser();
  const { mutate: changePassword, isPending: isChangingPassword } = useChangePassword();
  const setStoreUser = useAuthStore((state) => state.setUser);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (profile) {
      setFirstName(profile.firstName || "");
      setLastName(profile.lastName || "");
      setBio((profile as any).bio || "");
      setAvatarUrl(profile.avatarUrl || "");
    }
  }, [profile]);

  const fullName =
    [firstName, lastName].filter(Boolean).join(" ") || profile?.username || "";
  const initials = fullName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();

    if (!profile) return;

    updateUser(
      {
        id: profile.id,
        data: {
          firstName: firstName || null,
          lastName: lastName || null,
          bio: bio || null,
          avatarUrl: avatarUrl || null,
          status: profile.status,
          roleId: profile.roleId,
        },
      },
      {
        onSuccess: () => {
          toast.success("Profil uğurla yeniləndi");
          setStoreUser({
            ...profile,
            firstName,
            lastName,
            avatarUrl,
          });
        },
        onError: (error: any) => {
          const detail = error?.response?.data?.detail || "Xəta baş verdi";
          toast.error(`Profil yenilənə bilmədi: ${detail}`);
        },
      }
    );
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword || !newPassword) {
      toast.error("Bütün şifrə sahələrini doldurun");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Yeni şifrələr uyğun gəlmir");
      return;
    }

    changePassword(
      { currentPassword, newPassword },
      {
        onSuccess: () => {
          toast.success("Şifrə uğurla dəyişdirildi");
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
        },
        onError: (error: any) => {
          const detail = error?.response?.data?.detail || "Şifrə dəyişdirilə bilmədi";
          toast.error(detail);
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError || !profile) {
    return (
      <div className="flex h-96 items-center justify-center text-destructive">
        Profil yüklənərkən xəta baş verdi.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profil</h1>
        <p className="mt-2 text-muted-foreground">
          Şəxsi məlumatlarınızı və şifrənizi idarə edin.
        </p>
      </div>

      {/* Profile info */}
      <form onSubmit={handleSaveProfile} className="rounded-2xl border border-border bg-card p-8">
        <div className="mb-6 flex items-center gap-3 border-b border-border pb-4">
          <UserIcon className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-xl font-semibold">Şəxsi məlumatlar</h2>
        </div>

        <div className="mb-8 flex items-center gap-6">
          <Avatar className="h-20 w-20">
            {avatarUrl && <AvatarImage src={avatarUrl} />}
            <AvatarFallback>{initials || "AD"}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <label className="mb-2 block text-sm font-medium">Avatar URL</label>
            <Input
              placeholder="https://..."
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">Ad</label>
            <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Soyad</label>
            <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">İstifadəçi adı</label>
            <Input value={profile.username} disabled />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Email</label>
            <Input value={profile.email} disabled />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Rol</label>
            <Input value={profile.roleName} disabled />
          </div>
        </div>

        <div className="mt-6">
          <label className="mb-2 block text-sm font-medium">Bio</label>
          <Textarea
            rows={4}
            placeholder="Özünüz haqqında qısa məlumat..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
          >
            {isSaving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Yadda saxla
          </button>
        </div>
      </form>

      {/* Change password */}
      <form
        onSubmit={handleChangePassword}
        className="rounded-2xl border border-border bg-card p-8"
      >
        <div className="mb-6 flex items-center gap-3 border-b border-border pb-4">
          <KeyRound className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-xl font-semibold">Şifrəni dəyiş</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-medium">Cari şifrə</label>
            <Input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Yeni şifrə</label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Yeni şifrə (təkrar)</label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={isChangingPassword}
            className="inline-flex items-center rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
          >
            {isChangingPassword ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <KeyRound className="mr-2 h-4 w-4" />
            )}
            Şifrəni yenilə
          </button>
        </div>
      </form>
    </div>
  );
}