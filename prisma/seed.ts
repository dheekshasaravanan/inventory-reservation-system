import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const warehouse1 = await prisma.warehouse.create({
    data: {
      name: "Chennai Warehouse",
      location: "Chennai",
    },
  });

  const warehouse2 = await prisma.warehouse.create({
    data: {
      name: "Bangalore Warehouse",
      location: "Bangalore",
    },
  });

  const product1 = await prisma.product.create({
    data: {
      name: "iPhone 15",
      description: "Apple smartphone",
      price: 79999,
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: "PlayStation 5",
      description: "Gaming Console",
      price: 49999,
    },
  });

  await prisma.inventory.createMany({
    data: [
      {
        productId: product1.id,
        warehouseId: warehouse1.id,
        totalQuantity: 10,
      },
      {
        productId: product1.id,
        warehouseId: warehouse2.id,
        totalQuantity: 5,
      },
      {
        productId: product2.id,
        warehouseId: warehouse1.id,
        totalQuantity: 8,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });