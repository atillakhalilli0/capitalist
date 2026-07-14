"use client";

import { useState } from "react";
import { CalendarIcon } from "lucide-react";

import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";

type DatePickerFieldProps = {
  label: string;
  value?: Date;
  placeholder?: string;
  onChange?: (date: Date | undefined) => void;
};

export default function DatePickerField({
  label,
  value,
  placeholder = "Tarix seçin",
  onChange,
}: DatePickerFieldProps) {
  const [date, setDate] = useState<Date | undefined>(value);

  function handleSelect(selected: Date | undefined) {
    setDate(selected);
    onChange?.(selected);
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      <Popover>
        <PopoverTrigger
          render={
            <Button
              type="button"
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />

              {date
                ? format(date, "dd.MM.yyyy")
                : placeholder}
            </Button>
          }
        />

        <PopoverContent
          align="start"
          className="w-auto p-0"
        >
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}