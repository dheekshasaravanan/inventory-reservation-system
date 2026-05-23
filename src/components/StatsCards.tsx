"use client";

import { InventoryItem } from "@/types/inventory";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Package,
  Boxes,
  ShoppingCart,
  Warehouse,
} from "lucide-react";

interface Props {
  products: InventoryItem[];
}

export default function StatsCards({
  products,
}: Props) {
  const totalProducts =
    products.length;

  const totalAvailable =
    products.reduce(
      (sum, item) =>
        sum + item.availableQuantity,
      0
    );

  const totalReserved =
    products.reduce(
      (sum, item) =>
        sum + item.reservedQuantity,
      0
    );

  const totalWarehouses =
    new Set(
      products.map(
        (item) => item.warehouseId
      )
    ).size;

  const stats = [
    {
      title: "Products",
      value: totalProducts,
      icon: Package,
    },
    {
      title: "Available Stock",
      value: totalAvailable,
      icon: Boxes,
    },
    {
      title: "Reserved Stock",
      value: totalReserved,
      icon: ShoppingCart,
    },
    {
      title: "Warehouses",
      value: totalWarehouses,
      icon: Warehouse,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card
            key={stat.title}
            className="shadow-md rounded-2xl hover:shadow-xl transition"
          >
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">
                  {stat.title}
                </div>

                <div className="text-3xl font-bold mt-2">
                  {stat.value}
                </div>
              </div>

              <Icon className="w-10 h-10 text-slate-700" />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}