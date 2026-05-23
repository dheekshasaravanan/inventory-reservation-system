import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const inventories = await prisma.inventory.findMany({
      include: {
        product: true,
        warehouse: true,
      },
    });

    const formatted = inventories.map((item) => ({
      inventoryId: item.id,
      productId: item.productId,
      warehouseId: item.warehouseId,

      productName: item.product.name,
      warehouseName: item.warehouse.name,

      price: item.product.price,

      totalQuantity: item.totalQuantity,
      reservedQuantity: item.reservedQuantity,

      availableQuantity:
        item.totalQuantity - item.reservedQuantity,
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}