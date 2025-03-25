import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { date, trigger } = body;

    if (!date || !trigger) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const workout = await prisma.workout.create({
      data: {
        date: new Date(date),
        trigger,
        name: `Triggered by ${trigger}`,
        userId: session.user.id,
      },
    });

    return NextResponse.json(workout);
  } catch (error) {
    console.error("[WORKOUTS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
