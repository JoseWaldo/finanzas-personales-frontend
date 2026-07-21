import * as React from "react";
import { format, getDaysInMonth, getDay, startOfMonth } from "date-fns";
import { TZDate } from "@date-fns/tz";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { COLOMBIA_TZ, parseDateCol, todayCol, formatDateCol } from "@/lib/date-utils";

interface DateInputProps {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

const DAY_NAMES = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];
const MONTH_NAMES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

function parseTypedDate(input: string): string | null {
  const cleaned = input.trim().replace(/[\/\-\.]/g, "/");
  const parts = cleaned.split("/");
  if (parts.length !== 3) return null;

  const day = Number(parts[0]);
  const month = Number(parts[1]);
  const year = parts[2].length === 2 ? 2000 + Number(parts[2]) : Number(parts[2]);

  if (isNaN(day) || isNaN(month) || isNaN(year)) return null;
  if (month < 1 || month > 12) return null;
  if (day < 1 || day > 31) return null;

  return `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

const DateInput = React.forwardRef<HTMLDivElement, DateInputProps>(
  ({ value, onChange, className }, ref) => {
    const [popoverOpen, setPopoverOpen] = React.useState(false);
    const [typedValue, setTypedValue] = React.useState("");
    const isTyping = typedValue !== "";

    const selectedDate = value ? parseDateCol(value) : null;

    const [viewDate, setViewDate] = React.useState(() =>
      selectedDate ?? TZDate.tz(COLOMBIA_TZ)
    );

    React.useEffect(() => {
      if (selectedDate && !popoverOpen) {
        setViewDate(selectedDate);
      }
    }, [value, popoverOpen]);

    const handleTypedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      setTypedValue(raw);

      const parsed = parseTypedDate(raw);
      if (parsed) {
        onChange?.(parsed);
        setTypedValue("");
      }
    };

    const handleTypedBlur = () => {
      if (!selectedDate) {
        setTypedValue("");
      }
    };

    const selectDay = (day: number) => {
      const d = TZDate.tz(COLOMBIA_TZ, viewDate.getFullYear(), viewDate.getMonth(), day);
      const iso = format(d, "yyyy-MM-dd");
      onChange?.(iso);
      setPopoverOpen(false);
      setTypedValue("");
    };

    const goMonth = (delta: number) => {
      const d = new TZDate(viewDate, COLOMBIA_TZ);
      d.setMonth(viewDate.getMonth() + delta);
      setViewDate(d);
    };

    const daysInMonth = getDaysInMonth(viewDate);
    const firstDayOfWeek = getDay(startOfMonth(viewDate));

    const displayValue = isTyping
      ? typedValue
      : selectedDate
        ? formatDateCol(selectedDate, "dd MMM yyyy")
        : "";

    return (
      <div ref={ref} className={cn("relative", className)}>
        <div className="relative">
          <Calendar className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            className="flex h-9 w-full rounded-md border border-input/50 bg-transparent pl-8 pr-3 py-1 text-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="dd/mm/aaaa"
            value={displayValue}
            onChange={handleTypedChange}
            onBlur={handleTypedBlur}
            onFocus={() => setPopoverOpen(true)}
          />
        </div>

        {popoverOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setPopoverOpen(false)} />
            <div className="absolute left-0 top-full z-50 mt-1 w-64 rounded-lg border border-border/30 bg-card p-3 shadow-lg">
              <div className="mb-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => goMonth(-1)}
                  className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-accent cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="text-sm font-medium">
                  {MONTH_NAMES[viewDate.getMonth()]} {viewDate.getFullYear()}
                </span>
                <button
                  type="button"
                  onClick={() => goMonth(1)}
                  className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-accent cursor-pointer"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-0.5 mb-1">
                {DAY_NAMES.map((name) => (
                  <div key={name} className="flex h-7 items-center justify-center text-xs text-muted-foreground">
                    {name}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-0.5">
                {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}
                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                  const date = TZDate.tz(COLOMBIA_TZ, viewDate.getFullYear(), viewDate.getMonth(), day);
                  const isSelected =
                    selectedDate &&
                    selectedDate.getFullYear() === date.getFullYear() &&
                    selectedDate.getMonth() === date.getMonth() &&
                    selectedDate.getDate() === date.getDate();
                  const isToday = todayCol() === format(date, "yyyy-MM-dd");

                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => selectDay(day)}
                      className={cn(
                        "flex h-7 w-7 items-center justify-center rounded-md text-xs transition-colors cursor-pointer",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : isToday
                            ? "bg-accent text-accent-foreground font-medium"
                            : "hover:bg-accent text-foreground"
                      )}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
);
DateInput.displayName = "DateInput";

export { DateInput };
