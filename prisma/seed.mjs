import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create test user
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

  // Create test workouts
  const workouts = [
    {
      date: new Date("2025-03-25"),
      trigger: "Stress",
      userId: user.id,
    },
    {
      date: new Date("2025-03-24"),
      trigger: "Boredom",
      userId: user.id,
    },
    {
      date: new Date("2025-03-23"),
      trigger: "Habit",
      userId: user.id,
    },
    {
      date: new Date("2025-03-22"),
      trigger: "Social Media",
      userId: user.id,
    },
    {
      date: new Date("2025-03-21"),
      trigger: "Physical Sensation",
      userId: user.id,
    },
  ];

  // Insert workouts
  for (const workout of workouts) {
    await prisma.workout.create({
      data: workout,
    });
  }

  console.log("🌱 Database seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
