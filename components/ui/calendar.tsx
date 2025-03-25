"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  workouts?: { date: Date }[];
  showWorkouts?: boolean;
};

function Calendar({
  className,
  classNames,
  workouts = [],
  showWorkouts = false,
  ...props
}: CalendarProps) {
  // Create a map of dates to workout counts for efficient lookup
  const workoutMap = React.useMemo(() => {
    if (!showWorkouts || !workouts.length) return null;

    const map = new Map<string, number>();
    workouts.forEach((workout) => {
      const dateKey = new Date(workout.date).toDateString();
      map.set(dateKey, (map.get(dateKey) || 0) + 1);
    });
    return map;
  }, [workouts, showWorkouts]);

  // Function to modify day cell rendering
  const modifiersClassNames = React.useMemo(() => {
    return {
      ...classNames?.modifiers,
      workout: "bg-primary/10 font-medium text-primary",
    };
  }, [classNames?.modifiers]);

  // Function to determine modifiers for days
  const modifiers = React.useMemo(() => {
    if (!workoutMap) return {};

    const workoutDays: Record<string, Date> = {};
    workoutMap.forEach((count, dateStr) => {
      workoutDays[`workout-${dateStr}`] = new Date(dateStr);
    });

    return {
      ...props.modifiers,
      workout: Object.values(workoutDays),
    };
  }, [props.modifiers, workoutMap]);

  // Custom day component that can show workout count
  const renderDay = (day: Date) => {
    if (!showWorkouts || !workoutMap || !(day instanceof Date))
      return undefined;

    const count = workoutMap.get(day.toDateString());
    if (!count) return undefined;

    return (
      <div className="relative flex h-8 w-8 items-center justify-center">
        <div className="absolute -top-1 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
          {count}
        </div>
      </div>
    );
  };

  return (
    <DayPicker
      showOutsideDays={true}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-4 w-4" />,
        IconRight: () => <ChevronRight className="h-4 w-4" />,
        Day: ({ date, ...dayProps }) => {
          const dayContent = renderDay(date);
          if (dayContent) {
            return (
              <div {...dayProps}>
                {date.getDate()}
                {dayContent}
              </div>
            );
          }
          return <div {...dayProps}>{date.getDate()}</div>;
        },
      }}
      modifiersClassNames={modifiersClassNames}
      modifiers={modifiers}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
