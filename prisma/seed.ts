import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create a test user
  const hashedPassword = await bcrypt.hash("password123", 10);
  const user = await prisma.user.upsert({
    where: { email: "test@example.com" },
    update: {},
    create: {
      email: "test@example.com",
      name: "Test User",
      password: hashedPassword,
    },
  });

  // Create some test workouts
  const workouts = [
    {
      name: "Morning Run",
      date: new Date(),
      duration: 30,
      calories: 300,
      notes: "Great morning run!",
      userId: user.id,
    },
    {
      name: "Evening Walk",
      date: new Date(Date.now() - 24 * 60 * 60 * 1000),
      duration: 45,
      calories: 200,
      notes: "Nice evening walk",
      userId: user.id,
    },
    {
      name: "Bike Ride",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      duration: 60,
      calories: 400,
      notes: "Long bike ride",
      userId: user.id,
    },
    {
      name: "Swimming",
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      duration: 45,
      calories: 350,
      notes: "Pool session",
      userId: user.id,
    },
    {
      name: "Yoga",
      date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      duration: 30,
      calories: 150,
      notes: "Morning yoga",
      userId: user.id,
    },
  ];

  for (const workout of workouts) {
    await prisma.workout.upsert({
      where: {
        id: `${workout.name}-${workout.date.toISOString()}`,
      },
      update: {},
      create: workout,
    });
  }

  console.log("Database has been seeded. 🌱");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
