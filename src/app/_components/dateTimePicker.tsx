"use client";

import * as React from "react";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Button } from "~/components/ui/button";
import { CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "~/lib/utils";

export default function DateTimePicker({
  value,
  onChange,
}: {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
}) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    value
  );
  const [hour, setHour] = React.useState<number | undefined>(
    value ? value.getHours() : undefined
  );
  const [minute, setMinute] = React.useState<number | undefined>(
    value ? value.getMinutes() : undefined
  );
  React.useEffect(() => {
    if (!value) {
      setSelectedDate(undefined);
      setHour(undefined);
      setMinute(undefined);
    } else {
      setSelectedDate(value);
      setHour(value.getHours());
      setMinute(value.getMinutes());
    }
  }, [value]);
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = [0, 15, 30, 45];

  const updateDateTime = (newDate?: Date, h?: number, m?: number) => {
    if (!newDate || h === undefined || m === undefined) return;
    const updated = new Date(newDate);
    updated.setHours(h, m, 0, 0);
    onChange?.(updated);
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    updateDateTime(date, hour, minute);
  };

  const handleHourSelect = (h: number) => {
    setHour(h);
    updateDateTime(selectedDate, h, minute);
  };

  const handleMinuteSelect = (m: number) => {
    setMinute(m);
    updateDateTime(selectedDate, hour, m);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal text-foreground",
            !selectedDate && "text-muted-foreground"
          )}>
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? (
            <>
              {format(selectedDate, "PPP")}
              {hour !== undefined && minute !== undefined && (
                <span className="ml-2 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {`${hour.toString().padStart(2, "0")}:${minute
                    .toString()
                    .padStart(2, "0")}`}
                </span>
              )}
            </>
          ) : (
            <span>Select date & time</span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="flex gap-4 p-4 bg-background border w-auto">
        {/* Calendar */}
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          autoFocus
          className={cn(
            selectedDate && "[--color-primary:var(--color-secondary)]"
          )}
        />

        {/* Time Picker */}
        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            <p className="text-sm font-medium mb-2 text-muted-foreground">
              Hour
            </p>
            <div className="h-60 overflow-y-auto pr-1">
              {hours.map((h) => (
                <button
                  key={h}
                  onClick={() => handleHourSelect(h)}
                  className={cn(
                    "block w-10 text-center rounded-md py-1 text-sm hover:bg-accent",
                    h === hour && "bg-secondary text-black font-semibold"
                  )}>
                  {h.toString().padStart(2, "0")}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <p className="text-sm font-medium mb-2 text-muted-foreground">
              Minute
            </p>
            <div className="h-60 overflow-y-auto pr-1">
              {minutes.map((m) => (
                <button
                  key={m}
                  onClick={() => handleMinuteSelect(m)}
                  className={cn(
                    "block w-10 text-center rounded-md py-1 text-sm hover:bg-accent",
                    m === minute && "bg-secondary text-black font-semibold"
                  )}>
                  {m.toString().padStart(2, "0")}
                </button>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
