import { prisma } from "@/lib/prisma";

import {
  NextRequest,
  NextResponse,
} from "next/server";

export async function POST(
  req: NextRequest
) {
  try {
    const body = await req.json();

    const reservation =
      await prisma.reservation.findUnique({
        where: {
          id: body.reservationId,
        },
      });

    if (!reservation) {
      return NextResponse.json(
        {
          error:
            "Reservation not found",
        },
        { status: 404 }
      );
    }

    if (
      reservation.status !==
      "PENDING"
    ) {
      return NextResponse.json(
        {
          error:
            "Reservation already processed",
        },
        { status: 400 }
      );
    }

    if (
      new Date(
        reservation.expiresAt
      ) < new Date()
    ) {
      await prisma.reservation.update({
        where: {
          id: reservation.id,
        },
        data: {
          status: "EXPIRED",
        },
      });

      return NextResponse.json(
        {
          error:
            "Reservation expired",
        },
        { status: 410 }
      );
    }

    const confirmedReservation =
      await prisma.reservation.update({
        where: {
          id: reservation.id,
        },
        data: {
          status: "CONFIRMED",
        },
      });

    return NextResponse.json(
      confirmedReservation
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Confirmation failed",
      },
      { status: 500 }
    );
  }
}