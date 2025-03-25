"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export function BehaviorCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Mock data - in a real app this would come from your database
  const eventDays = [3, 7, 12, 15, 18, 23, 27]

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const renderCalendar = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDay = getFirstDayOfMonth(year, month)

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 w-10"></div>)
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const hasEvent = eventDays.includes(day)
      const isToday =
        new Date().getDate() === day && new Date().getMonth() === month && new Date().getFullYear() === year

      days.push(
        <div
          key={day}
          className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors
          ${hasEvent ? "bg-red-500 text-white" : ""}
          ${!hasEvent && day < new Date().getDate() && month === new Date().getMonth() ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : ""}
          ${isToday ? "ring-2 ring-primary" : ""}
          hover:bg-muted cursor-pointer
        `}
        >
          {day}
        </div>,
      )
    }

    return days
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <div className="flex gap-1">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center">
        <div className="text-sm font-medium">Sun</div>
        <div className="text-sm font-medium">Mon</div>
        <div className="text-sm font-medium">Tue</div>
        <div className="text-sm font-medium">Wed</div>
        <div className="text-sm font-medium">Thu</div>
        <div className="text-sm font-medium">Fri</div>
        <div className="text-sm font-medium">Sat</div>
        {renderCalendar()}
      </div>
    </div>
  )
}

