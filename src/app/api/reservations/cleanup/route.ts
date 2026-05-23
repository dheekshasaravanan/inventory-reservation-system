import { NextResponse } from "next/server";

import { cleanupExpiredReservations } from "@/lib/cleanup";

export async function POST() {
  try {
    await cleanupExpiredReservations();

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Cleanup failed",
      },
      { status: 500 }
    );
  }
}