import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    await prisma.$transaction(async (tx) => {
      const reservation =
        await tx.reservation.findUnique({
          where: {
            id: body.reservationId,
          },
        });

      if (!reservation) {
        throw new Error("Reservation not found");
      }

      if (
        reservation.status !== "PENDING"
      ) {
        throw new Error(
          "Reservation cannot be released"
        );
      }

      const inventory =
        await tx.inventory.findUnique({
          where: {
            productId_warehouseId: {
              productId: reservation.productId,
              warehouseId:
                reservation.warehouseId,
            },
          },
        });

      if (!inventory) {
        throw new Error("Inventory missing");
      }

      await tx.inventory.update({
        where: {
          id: inventory.id,
        },
        data: {
          reservedQuantity: {
            decrement:
              reservation.quantity,
          },
        },
      });

      await tx.reservation.update({
        where: {
          id: reservation.id,
        },
        data: {
          status: "RELEASED",
        },
      });
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error:
          error.message ||
          "Release failed",
      },
      { status: 400 }
    );
  }
}