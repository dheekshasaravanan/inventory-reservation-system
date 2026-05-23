import { prisma } from "@/lib/prisma";

export async function cleanupExpiredReservations() {
  const expiredReservations =
    await prisma.reservation.findMany({
      where: {
        status: "PENDING",

        expiresAt: {
          lte: new Date(),
        },
      },
    });

  for (const reservation of expiredReservations) {
    await prisma.$transaction(
      async (tx) => {
        const inventory =
          await tx.inventory.findUnique({
            where: {
              productId_warehouseId: {
                productId:
                  reservation.productId,
                warehouseId:
                  reservation.warehouseId,
              },
            },
          });

        if (!inventory) {
          return;
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
            status: "EXPIRED",
          },
        });
      }
    );
  }
}