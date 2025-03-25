"use client"

export function TimeOfDayChart() {
  // This is a simplified chart representation
  // In a real app, you would use a charting library like recharts

  // Mock data - in a real app this would come from your database
  const data = [
    { day: "Mon", value: 2, color: "bg-blue-500" },
    { day: "Tue", value: 1, color: "bg-blue-500" },
    { day: "Wed", value: 3, color: "bg-blue-500" },
    { day: "Thu", value: 0, color: "bg-blue-500" },
    { day: "Fri", value: 2, color: "bg-blue-500" },
    { day: "Sat", value: 4, color: "bg-red-500" },
    { day: "Sun", value: 3, color: "bg-red-500" },
  ]

  const maxValue = Math.max(...data.map((d) => d.value))

  return (
    <div className="h-[200px] w-full">
      <div className="flex h-full items-end gap-2">
        {data.map((item) => (
          <div key={item.day} className="flex flex-1 flex-col items-center gap-2">
            <div
              className={`w-full rounded-t ${item.color} transition-all duration-500 hover:opacity-80`}
              style={{
                height: `${(item.value / maxValue) * 100}%`,
                minHeight: item.value > 0 ? "10px" : "0",
              }}
            ></div>
            <span className="text-xs font-medium">{item.day}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-4 text-sm">
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded bg-blue-500"></div>
          <span>Weekdays</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded bg-red-500"></div>
          <span>Weekends</span>
        </div>
      </div>
    </div>
  )
}

