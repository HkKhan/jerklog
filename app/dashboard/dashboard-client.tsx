"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {
  Calendar,
  Clock,
  DollarSign,
  LineChart,
  List,
  MessageSquare,
  Settings,
  Plus,
  Award,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BehaviorCalendar } from "@/components/behavior-calendar";
import { BehaviorHeatmap } from "@/components/behavior-heatmap";
import { ContentSourceChart } from "@/components/content-source-chart";
import { TimeOfDayChart } from "@/components/time-of-day-chart";
import { RecentActivityList } from "@/components/recent-activity-list";
import { UserNav } from "@/components/user-nav";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar as CalendarPicker } from "@/components/ui/calendar";
import { DayPickerSingleProps } from "react-day-picker";
import { startOfWeek, endOfWeek, eachDayOfInterval } from "date-fns";
import React from "react";

interface DashboardData {
  workouts: {
    id: string;
    name: string;
    date: Date;
    duration: number;
    calories: number;
    notes?: string;
    trigger: string;
  }[];
  stats: {
    currentStreak: number;
    bestStreak: number;
    averageInterval: string;
    totalWorkouts: number;
  };
}

interface DashboardClientProps {
  initialData: DashboardData;
}

export default function DashboardClient({ initialData }: DashboardClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [date, setDate] = useState<Date>(new Date());
  const [trigger, setTrigger] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [triggers, setTriggers] = useState<string[]>([
    "Boredom",
    "Stress",
    "Habit",
    "Social Media",
    "Porn",
    "Physical Sensation",
    "Other",
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/workouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: date.toISOString(),
          trigger,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to log workout");
      }

      setTrigger("");
      setDate(new Date());
      setIsOpen(false);

      router.refresh();
    } catch (error) {
      console.error("Error logging workout:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDateSelect: DayPickerSingleProps["onSelect"] = (date) => {
    if (date) {
      setDate(date);
    }
  };

  useEffect(() => {
    if (initialData.workouts.length > 0) {
      const uniqueTriggers = [
        ...new Set(initialData.workouts.map((workout) => workout.trigger)),
      ];

      const defaultTriggers = [
        "Boredom",
        "Stress",
        "Habit",
        "Social Media",
        "Porn",
        "Physical Sensation",
        "Other",
      ];
      const allTriggers = [...new Set([...uniqueTriggers, ...defaultTriggers])];

      setTriggers(allTriggers);
    }
  }, [initialData.workouts]);

  // Calculate weekly activity
  const weeklyActivity = React.useMemo(() => {
    const start = startOfWeek(new Date());
    const end = endOfWeek(new Date());
    const days = eachDayOfInterval({ start, end });

    return days.map((day) => {
      const dayWorkouts = initialData.workouts.filter(
        (workout) =>
          format(new Date(workout.date), "yyyy-MM-dd") ===
          format(day, "yyyy-MM-dd")
      );
      return {
        date: day,
        count: dayWorkouts.length,
        workouts: dayWorkouts,
      };
    });
  }, [initialData.workouts]);

  // Calculate trigger sources
  const triggerSources = React.useMemo(() => {
    const triggerCounts = initialData.workouts.reduce((acc, workout) => {
      acc[workout.trigger] = (acc[workout.trigger] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const total = Object.values(triggerCounts).reduce((a, b) => a + b, 0);

    return Object.entries(triggerCounts)
      .map(([trigger, count]) => ({
        trigger,
        count,
        percentage: Math.round((count / total) * 100),
      }))
      .sort((a, b) => b.count - a.count);
  }, [initialData.workouts]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="bg-background/60 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="container flex h-16 items-center px-4 sm:px-8">
          <span className="text-lg font-bold text-primary">Jerklog</span>
          <nav className="ml-auto flex items-center gap-4">
            <UserNav />
          </nav>
        </div>
      </header>
      <div className="grid flex-1">
        <div className="container grid items-start gap-4 py-6 md:grid-cols-[220px_1fr] lg:grid-cols-[240px_1fr]">
          <aside className="hidden md:block">
            <div className="sticky top-20">
              <div className="mb-6 rounded-lg border bg-card p-4">
                <div className="mb-4 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span className="text-sm font-medium">
                    {initialData.stats.currentStreak} day streak
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress to 7 days</span>
                    <span className="font-medium">
                      {initialData.stats.currentStreak}/7
                    </span>
                  </div>
                  <Progress
                    value={(initialData.stats.currentStreak / 7) * 100}
                    className="h-2"
                  />
                </div>
              </div>

              <nav className="grid items-start gap-2">
                <Button
                  variant={activeTab === "overview" ? "secondary" : "ghost"}
                  className="justify-start"
                  onClick={() => setActiveTab("overview")}
                >
                  <LineChart className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
                <Button
                  variant={activeTab === "calendar" ? "secondary" : "ghost"}
                  className="justify-start"
                  onClick={() => setActiveTab("calendar")}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Calendar
                </Button>
                <Button
                  variant={activeTab === "activity" ? "secondary" : "ghost"}
                  className="justify-start"
                  onClick={() => setActiveTab("activity")}
                >
                  <List className="mr-2 h-4 w-4" />
                  Activity
                </Button>
                <Button
                  variant={activeTab === "triggers" ? "secondary" : "ghost"}
                  className="justify-start"
                  onClick={() => setActiveTab("triggers")}
                >
                  <Zap className="mr-2 h-4 w-4" />
                  Insights
                </Button>
                <Button
                  variant={activeTab === "settings" ? "secondary" : "ghost"}
                  className="justify-start"
                  onClick={() => setActiveTab("settings")}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              </nav>

              <div className="mt-6 rounded-lg border bg-primary/5 p-4">
                <h3 className="font-medium mb-2">Need support?</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Reach out anytime for help on your journey.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Contact Support
                </Button>
              </div>
            </div>
          </aside>
          <main className="space-y-4">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="space-y-4"
            >
              <TabsList className="md:hidden">
                <TabsTrigger value="overview">Dashboard</TabsTrigger>
                <TabsTrigger value="calendar">Calendar</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="triggers">Insights</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold tracking-tight">
                    Your Dashboard
                  </h2>
                  <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="mr-2 h-4 w-4" /> Log Event
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Log New Event</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Date</label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {date ? (
                                    format(date, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <CalendarPicker
                                  mode="single"
                                  selected={date}
                                  onSelect={handleDateSelect}
                                  disabled={(date: Date) =>
                                    date > new Date() ||
                                    date < new Date("2000-01-01")
                                  }
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">
                              What triggered you?
                            </label>
                            <Select value={trigger} onValueChange={setTrigger}>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a trigger" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Common Triggers</SelectLabel>
                                  {triggers.map((t) => (
                                    <SelectItem
                                      key={t}
                                      value={t}
                                      className="cursor-pointer"
                                    >
                                      {t}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <Button
                          type="submit"
                          className="w-full"
                          disabled={isSubmitting || !trigger}
                        >
                          {isSubmitting ? "Logging..." : "Log Event"}
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>

                <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-green-100 p-3 dark:bg-green-900">
                        <Award className="h-6 w-6 text-green-700 dark:text-green-300" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-green-800 dark:text-green-300">
                          {initialData.stats.currentStreak} Day Streak!
                        </h3>
                        <p className="text-green-700 dark:text-green-400">
                          You're making great progress. Keep it up!
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        className="ml-auto border-green-200 text-green-700 hover:bg-green-100 hover:text-green-800 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-900"
                      >
                        View Achievements
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Current Streak
                      </CardTitle>
                      <Award className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {initialData.stats.currentStreak} days
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Best: {initialData.stats.bestStreak} days
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Average Interval
                      </CardTitle>
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {initialData.stats.averageInterval} days
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Total workouts: {initialData.stats.totalWorkouts}
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Common Trigger
                      </CardTitle>
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">Social Media</div>
                      <p className="text-xs text-muted-foreground">
                        42% of events
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Accountability
                      </CardTitle>
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$24.00</div>
                      <p className="text-xs text-muted-foreground">
                        Donated to charity
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="col-span-4">
                    <CardHeader>
                      <CardTitle>Weekly Activity</CardTitle>
                      <CardDescription>
                        Your progress over the past week
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <div className="grid grid-cols-7 gap-2">
                        {weeklyActivity.map(({ date, count, workouts }) => (
                          <div
                            key={date.toISOString()}
                            className="group relative flex flex-col items-center"
                          >
                            <div className="text-sm text-muted-foreground">
                              {format(date, "EEE")}
                            </div>
                            <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium">
                              {count}
                            </div>
                            {workouts.length > 0 && (
                              <div className="absolute left-1/2 top-full z-10 mt-2 hidden -translate-x-1/2 transform rounded-lg bg-popover p-2 text-sm shadow-lg group-hover:block">
                                {workouts.map((workout) => (
                                  <div
                                    key={workout.id}
                                    className="whitespace-nowrap"
                                  >
                                    {format(new Date(workout.date), "h:mm a")} -{" "}
                                    {workout.trigger}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="col-span-3">
                    <CardHeader>
                      <CardTitle>Trigger Sources</CardTitle>
                      <CardDescription>
                        What triggers you most often
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {triggerSources.map(
                          ({ trigger, count, percentage }) => (
                            <div key={trigger} className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">
                                  {trigger}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                  {count} ({percentage}%)
                                </span>
                              </div>
                              <Progress value={percentage} className="h-2" />
                            </div>
                          )
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="col-span-4">
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                      <CardDescription>
                        Your last 5 logged events
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RecentActivityList workouts={initialData.workouts} />
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => router.push("/activity")}
                      >
                        View All Activity
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card className="col-span-3">
                    <CardHeader>
                      <CardTitle>Log New Event</CardTitle>
                      <CardDescription>
                        Track what happened to improve awareness
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Date</label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {date ? (
                                    format(date, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <CalendarPicker
                                  mode="single"
                                  selected={date}
                                  onSelect={handleDateSelect}
                                  disabled={(date: Date) =>
                                    date > new Date() ||
                                    date < new Date("2000-01-01")
                                  }
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">
                              What triggered you?
                            </label>
                            <Select value={trigger} onValueChange={setTrigger}>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a trigger" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Common Triggers</SelectLabel>
                                  {triggers.map((t) => (
                                    <SelectItem
                                      key={t}
                                      value={t}
                                      className="cursor-pointer"
                                    >
                                      {t}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <Button
                          type="submit"
                          className="w-full"
                          disabled={isSubmitting || !trigger}
                        >
                          {isSubmitting ? "Logging..." : "Log Event"}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="calendar" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold tracking-tight">
                    Your Calendar
                  </h2>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" /> Log Event
                  </Button>
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly View</CardTitle>
                    <CardDescription>
                      Track your progress over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <BehaviorCalendar />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Time of Day Patterns</CardTitle>
                    <CardDescription>
                      When you're most vulnerable
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <BehaviorHeatmap />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold tracking-tight">
                    Activity Calendar
                  </h2>
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly View</CardTitle>
                    <CardDescription>
                      Track your progress over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CalendarPicker
                      mode="single"
                      workouts={initialData.workouts}
                      showWorkouts={true}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="triggers" className="space-y-4">
                {/* Triggers tab content */}
              </TabsContent>
              <TabsContent value="settings" className="space-y-4">
                {/* Settings tab content */}
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Jerklog. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Terms
            </Link>
            <Link
              href="/contact"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
