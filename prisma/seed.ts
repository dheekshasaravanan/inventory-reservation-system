import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // CLEAR OLD DATA
  await prisma.reservation.deleteMany();

  await prisma.inventory.deleteMany();

  await prisma.product.deleteMany();

  await prisma.warehouse.deleteMany();

  // WAREHOUSES
  const chennai =
    await prisma.warehouse.create({
      data: {
        name: "Chennai Warehouse",
        location: "Chennai",
      },
    });

  const bangalore =
    await prisma.warehouse.create({
      data: {
        name: "Bangalore Warehouse",
        location: "Bangalore",
      },
    });

  const mumbai =
    await prisma.warehouse.create({
      data: {
        name: "Mumbai Warehouse",
        location: "Mumbai",
      },
    });

  const delhi =
    await prisma.warehouse.create({
      data: {
        name: "Delhi Warehouse",
        location: "Delhi",
      },
    });

  // PRODUCTS
  const products =
    await prisma.product.createManyAndReturn(
      {
        data: [
          {
            name: "iPhone 15",
            description:
              "Apple flagship smartphone",
            price: 79999,
          },

          {
            name: "MacBook Pro M3",
            description:
              "Apple professional laptop",
            price: 189999,
          },

          {
            name: "AirPods Pro",
            description:
              "Wireless earbuds",
            price: 24999,
          },

          {
            name: "PlayStation 5",
            description:
              "Sony gaming console",
            price: 49999,
          },

          {
            name: "Xbox Series X",
            description:
              "Microsoft gaming console",
            price: 52999,
          },

          {
            name: "Samsung S24 Ultra",
            description:
              "Samsung flagship smartphone",
            price: 124999,
          },

          {
            name: "iPad Pro",
            description:
              "Apple premium tablet",
            price: 99999,
          },

          {
            name: "Apple Watch Ultra",
            description:
              "Premium smartwatch",
            price: 89999,
          },

          {
            name: "Sony WH-1000XM5",
            description:
              "Noise cancelling headphones",
            price: 29999,
          },

          {
            name:
              "Logitech MX Master 3S",
            description:
              "Professional wireless mouse",
            price: 9999,
          },
        ],
      }
    );

  // INVENTORY
  const warehouses = [
    chennai,
    bangalore,
    mumbai,
    delhi,
  ];

  const inventoryData: any[] = [];

  for (const product of products) {
    for (const warehouse of warehouses) {
      inventoryData.push({
        productId: product.id,

        warehouseId: warehouse.id,

        totalQuantity:
          Math.floor(
            Math.random() * 20
          ) + 5,

        reservedQuantity:
          Math.floor(
            Math.random() * 4
          ),
      });
    }
  }

  await prisma.inventory.createMany({
    data: inventoryData,
  });

  console.log(
    "✅ Database seeded successfully"
  );
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