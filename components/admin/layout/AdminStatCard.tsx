import type { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/card";

type AdminStatCardProps = {
  title: string;
  value: string | number;
  description?: string;
  icon: ReactNode;
};

export default function AdminStatCard({
  title,
  value,
  description,
  icon,
}: AdminStatCardProps) {
  return (
    <Card className="rounded-2xl">
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-sm text-muted-foreground">
            {title}
          </p>

          <h3 className="mt-2 text-3xl font-bold">
            {value}
          </h3>

          {description && (
            <p className="mt-2 text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}