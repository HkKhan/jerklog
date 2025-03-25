"use client"

export function ContentSourceChart() {
  // Mock data - in a real app this would come from your database
  const data = [
    { name: "Social Media", value: 42, color: "bg-blue-500 dark:bg-blue-600" },
    { name: "Video Platforms", value: 28, color: "bg-red-500 dark:bg-red-600" },
    { name: "Websites", value: 18, color: "bg-amber-500 dark:bg-amber-600" },
    { name: "Other", value: 12, color: "bg-purple-500 dark:bg-purple-600" },
  ]

  return (
    <div className="space-y-4">
      {data.map((item) => (
        <div key={item.name} className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{item.name}</span>
            <span className="text-sm text-muted-foreground">{item.value}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-muted">
            <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${item.value}%` }}></div>
          </div>
        </div>
      ))}
    </div>
  )
}

