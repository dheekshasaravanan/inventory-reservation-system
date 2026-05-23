import { prisma } from "@/lib/prisma";

import { reservationSchema } from "@/validations/reservation";

import {
  NextRequest,
  NextResponse,
} from "next/server";

export async function POST(
  req: NextRequest
) {
  try {
    const idempotencyKey =
      req.headers.get(
        "Idempotency-Key"
      );

    if (!idempotencyKey) {
      return NextResponse.json(
        {
          error:
            "Missing Idempotency-Key header",
        },
        { status: 400 }
      );
    }

    const existingKey =
      await prisma.idempotencyKey.findUnique(
        {
          where: {
            key: idempotencyKey,
          },
        }
      );

    if (
      existingKey &&
      existingKey.response
    ) {
      return NextResponse.json(
        existingKey.response
      );
    }

    const body = await req.json();

    const validated =
      reservationSchema.parse(body);

    const result =
      await prisma.$transaction(
        async (tx) => {
          const inventory =
            await tx.inventory.findUnique(
              {
                where: {
                  productId_warehouseId:
                    {
                      productId:
                        validated.productId,

                      warehouseId:
                        validated.warehouseId,
                    },
                },
              }
            );

          if (!inventory) {
            throw new Error(
              "Inventory not found"
            );
          }

          const available =
            inventory.totalQuantity -
            inventory.reservedQuantity;

          if (
            available <
            validated.quantity
          ) {
            throw new Error(
              "Insufficient stock"
            );
          }

          await tx.inventory.update({
            where: {
              id: inventory.id,
            },
            data: {
              reservedQuantity: {
                increment:
                  validated.quantity,
              },
            },
          });

          const reservation =
            await tx.reservation.create(
              {
                data: {
                  productId:
                    validated.productId,

                  warehouseId:
                    validated.warehouseId,

                  quantity:
                    validated.quantity,

                  expiresAt:
                    new Date(
                      Date.now() +
                        1 *
                          60 *
                          1000
                    ),
                },
              }
            );

          await tx.idempotencyKey.create(
            {
              data: {
                key: idempotencyKey,

                response:
                  reservation as any,
              },
            }
          );

          return reservation;
        }
      );

    return NextResponse.json(result);
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          error.message ||
          "Reservation failed",
      },
      { status: 400 }
    );
  }
}