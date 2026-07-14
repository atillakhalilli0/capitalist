"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Status = "draft" | "review" | "published" | "archived";

type StatusSelectProps = {
  value?: Status;
  onValueChange?: (value: Status) => void;
};

const statuses: {
  value: Status;
  label: string;
}[] = [
  {
    value: "draft",
    label: "Qaralama",
  },
  {
    value: "review",
    label: "Yoxlanışda",
  },
  {
    value: "published",
    label: "Dərc olunub",
  },
  {
    value: "archived",
    label: "Arxiv",
  },
];

export default function StatusSelect({
  value,
  onValueChange,
}: StatusSelectProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">
        Status
      </label>

      <Select
        value={value}
        onValueChange={(v) => onValueChange?.(v as Status)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Status seçin" />
        </SelectTrigger>

        <SelectContent>
          {statuses.map((status) => (
            <SelectItem
              key={status.value}
              value={status.value}
            >
              {status.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}