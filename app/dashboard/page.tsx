import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import DashboardClient from "./dashboard-client";

const prisma = new PrismaClient();

async function getDashboardData(userId: string) {
  const workouts = await prisma.workout.findMany({
    where: {
      userId,
    },
    orderBy: {
      date: "desc",
    },
    take: 5,
  });

  const allWorkouts = await prisma.workout.findMany({
    where: {
      userId,
    },
    orderBy: {
      date: "desc",
    },
  });

  // Calculate streak
  let currentStreak = 0;
  let bestStreak = 0;
  let tempStreak = 1;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < allWorkouts.length; i++) {
    const workoutDate = new Date(allWorkouts[i].date);
    workoutDate.setHours(0, 0, 0, 0);
    const diffDays = Math.floor(
      (today.getTime() - workoutDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (i === 0 && diffDays <= 1) {
      currentStreak = 1;
    } else if (i > 0) {
      const prevWorkoutDate = new Date(allWorkouts[i - 1].date);
      prevWorkoutDate.setHours(0, 0, 0, 0);
      const daysBetween = Math.floor(
        (prevWorkoutDate.getTime() - workoutDate.getTime()) /
          (1000 * 60 * 60 * 24)
      );

      if (daysBetween === 1) {
        tempStreak++;
        bestStreak = Math.max(bestStreak, tempStreak);
      } else {
        tempStreak = 1;
      }
    }
  }

  // Calculate average interval
  let totalInterval = 0;
  let intervalCount = 0;
  for (let i = 1; i < allWorkouts.length; i++) {
    const daysBetween = Math.floor(
      (new Date(allWorkouts[i - 1].date).getTime() -
        new Date(allWorkouts[i].date).getTime()) /
        (1000 * 60 * 60 * 24)
    );
    totalInterval += daysBetween;
    intervalCount++;
  }
  const averageInterval =
    intervalCount > 0 ? (totalInterval / intervalCount).toFixed(1) : "0";

  return {
    workouts,
    stats: {
      currentStreak,
      bestStreak,
      averageInterval,
      totalWorkouts: allWorkouts.length,
    },
  };
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  const data = await getDashboardData(session.user.id);

  return <DashboardClient initialData={data} />;
}
