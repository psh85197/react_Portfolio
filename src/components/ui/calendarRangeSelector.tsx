import {format, parse} from "date-fns";
import {Calendar} from "@/components/ui/calendar.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {CalendarIcon} from "lucide-react";
import {cn} from "@/lib/utils.ts";
import {DateRange} from "react-day-picker";
import {UseFormReturn, useWatch} from "react-hook-form";

interface CalendarRangeSelectorProps {
  fromKey: string;
  toKey: string;
  form: UseFormReturn<any>;
}

export const CalendarRangeSelector = ({fromKey, toKey, form}: CalendarRangeSelectorProps) => {
  const fromValue = useWatch({control: form.control, name: fromKey});
  const toValue = useWatch({control: form.control, name: toKey});

  const selectedRange: DateRange = {
    from: fromValue ? parse(fromValue, "yyyy.MM.dd", new Date()) : undefined,
    to: toValue ? parse(toValue, "yyyy.MM.dd", new Date()) : undefined,
  };

  const handleChange = (range: DateRange | undefined) => {
    form.setValue(fromKey, range?.from ? format(range.from, "yyyy.MM.dd") : "");
    form.setValue(toKey, range?.to ? format(range.to, "yyyy.MM.dd") : "");
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !selectedRange?.from && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4"/>
          {selectedRange?.from ? (
            selectedRange.to ? (
              <>
                {format(selectedRange.from, "yyyy-MM-dd")} -{" "}
                {format(selectedRange.to, "yyyy-MM-dd")}
              </>
            ) : (
              format(selectedRange.from, "yyyy-MM-dd")
            )
          ) : (
            <span>날짜를 선택하세요</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          numberOfMonths={2}
          selected={selectedRange}
          onSelect={handleChange}
        />
      </PopoverContent>
    </Popover>
  );
};