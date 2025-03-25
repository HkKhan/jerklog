"use client"

import React from "react"

export function BehaviorHeatmap() {
  // Mock data - in a real app this would come from your database
  const heatmapData = [
    { day: "Monday", hours: [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 2, 1, 0] },
    { day: "Tuesday", hours: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 0, 0, 0] },
    { day: "Wednesday", hours: [0, 0, 0, 0, 0, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { day: "Thursday", hours: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 1, 0] },
    { day: "Friday", hours: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 1] },
    { day: "Saturday", hours: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 3, 2, 1, 0] },
    { day: "Sunday", hours: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 2, 1, 0] },
  ]

  const getColor = (value: number) => {
    if (value === 0) return "bg-muted"
    if (value === 1) return "bg-amber-200 dark:bg-amber-900/40"
    if (value === 2) return "bg-amber-300 dark:bg-amber-800/60"
    return "bg-red-400 dark:bg-red-700"
  }

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-[80px_repeat(24,1fr)] gap-1">
        <div className="text-sm font-medium"></div>
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="text-xs text-center">
            {i % 3 === 0 ? `${i}h` : ""}
          </div>
        ))}

        {heatmapData.map((row) => (
          <React.Fragment key={row.day}>
            <div className="text-sm">{row.day}</div>
            {row.hours.map((value, i) => (
              <div
                key={i}
                className={`h-6 rounded ${getColor(value)}`}
                title={`${row.day} ${i}:00 - ${value} events`}
              ></div>
            ))}
          </React.Fragment>
        ))}
      </div>

      <div className="flex items-center justify-end gap-2 text-sm">
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded bg-muted"></div>
          <span>Safe</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded bg-amber-200 dark:bg-amber-900/40"></div>
          <span>Low Risk</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded bg-amber-300 dark:bg-amber-800/60"></div>
          <span>Medium Risk</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded bg-red-400 dark:bg-red-700"></div>
          <span>High Risk</span>
        </div>
      </div>
    </div>
  )
}

