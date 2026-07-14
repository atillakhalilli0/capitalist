"use client";

import { Bell, Moon, Search, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminHeader() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-border bg-background/80 px-8 backdrop-blur">
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          placeholder="Məqalə, müəllif və ya podkast axtarın..."
          className="pl-10"
        />
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setTheme(theme === "dark" ? "light" : "dark")
          }
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>

        <Button
          variant="outline"
          size="icon"
        >
          <Bell className="h-5 w-5" />
        </Button>

        <Avatar className="h-10 w-10">
          <AvatarImage src="https://i.pravatar.cc/100?img=12" />

          <AvatarFallback>AT</AvatarFallback>
        </Avatar>

        <div className="hidden text-sm md:block">
          <p className="font-semibold">Atilla Xəlilli</p>

          <p className="text-muted-foreground">
            Super Admin
          </p>
        </div>
      </div>
    </header>
  );
}