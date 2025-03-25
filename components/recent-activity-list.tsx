interface Workout {
  id: string;
  name: string;
  date: Date;
  duration: number;
  calories: number;
  notes?: string;
}

interface RecentActivityListProps {
  workouts: Workout[];
}

export function RecentActivityList({ workouts }: RecentActivityListProps) {
  return (
    <div className="space-y-4">
      {workouts.map((workout) => (
        <div key={workout.id} className="flex items-center justify-between">
          <div>
            <p className="font-medium">{workout.name}</p>
            <p className="text-sm text-muted-foreground">
              {new Date(workout.date).toLocaleDateString()} • {workout.duration}{" "}
              minutes
            </p>
          </div>
          <div className="text-right">
            <p className="font-medium">{workout.calories} cal</p>
            {workout.notes && (
              <p className="text-sm text-muted-foreground">{workout.notes}</p>
            )}
          </div>
        </div>
      ))}
      {workouts.length === 0 && (
        <p className="text-center text-muted-foreground">No recent activity</p>
      )}
    </div>
  );
}
