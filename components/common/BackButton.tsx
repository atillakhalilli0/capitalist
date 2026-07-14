"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      size="lg"
      onClick={() => router.back()}
      className="rounded-2xl"
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      Geri qayıt
    </Button>
  );
}