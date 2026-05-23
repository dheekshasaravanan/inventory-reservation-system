"use client";

import { useEffect, useState } from "react";

import ThemeToggle from "@/components/ThemeToggle";
import StatsCards from "@/components/StatsCards";
import ReserveDialog from "@/components/ReserveDialog";
import ActiveReservations from "@/components/ActiveReservations";
import DashboardSkeleton from "@/components/DashboardSkeleton";

import { InventoryItem } from "@/types/inventory";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import {
  Package,
  Warehouse,
  TrendingUp,
} from "lucide-react";

export default function HomePage() {
  const [products, setProducts] =
    useState<InventoryItem[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const res = await fetch(
        "/api/products"
      );

      const data = await res.json();

      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

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

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-8 transition-colors duration-300">
        <DashboardSkeleton />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-6 lg:p-8 transition-colors duration-300">
      {/* THEME TOGGLE */}
      <div className="flex justify-end mb-6">
        <ThemeToggle />
      </div>

      {/* HERO SECTION */}
      <div className="relative overflow-hidden mb-10 rounded-[2rem] bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 p-10 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_35%)]" />

        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-4 py-1.5 text-sm backdrop-blur mb-5">
              🚀 Enterprise Inventory
              Intelligence
            </div>

            <h1 className="text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Inventory Reservation
              Platform
            </h1>

            <p className="text-slate-300 mt-5 text-lg leading-relaxed">
              Real-time warehouse
              inventory management with
              automated reservation
              lifecycle, intelligent stock
              tracking, and live
              operational analytics.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <div className="rounded-full bg-emerald-500/20 border border-emerald-400/20 px-4 py-2 text-sm">
                ✅ Auto Expiry System
              </div>

              <div className="rounded-full bg-blue-500/20 border border-blue-400/20 px-4 py-2 text-sm">
                ⚡ Real-Time Updates
              </div>

              <div className="rounded-full bg-orange-500/20 border border-orange-400/20 px-4 py-2 text-sm">
                📦 Warehouse Tracking
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 min-w-[280px]">
            <div className="rounded-3xl bg-white/10 backdrop-blur p-6 text-center border border-white/10">
              <div className="text-4xl font-black">
                {products.length}
              </div>

              <div className="text-sm text-slate-300 mt-2">
                Products
              </div>
            </div>

            <div className="rounded-3xl bg-white/10 backdrop-blur p-6 text-center border border-white/10">
              <div className="text-4xl font-black">
                {totalAvailable}
              </div>

              <div className="text-sm text-slate-300 mt-2">
                Available
              </div>
            </div>

            <div className="rounded-3xl bg-white/10 backdrop-blur p-6 text-center border border-white/10">
              <div className="text-4xl font-black">
                {totalReserved}
              </div>

              <div className="text-sm text-slate-300 mt-2">
                Reserved
              </div>
            </div>

            <div className="rounded-3xl bg-white/10 backdrop-blur p-6 text-center border border-white/10">
              <div className="flex justify-center mb-2">
                <TrendingUp className="w-8 h-8" />
              </div>

              <div className="text-sm text-slate-300">
                Live Analytics
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STATS */}
      <StatsCards products={products} />

      {/* INVENTORY GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
        {products.map((item) => (
          <Card
            key={item.inventoryId}
            className={`rounded-[2rem] border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden ${
              item.availableQuantity <= 0
                ? "ring-2 ring-red-200"
                : ""
            }`}
          >
            <CardContent className="p-7">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                    {item.productName}
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Premium Inventory
                    Item
                  </p>

                  <div className="mt-3 flex items-center gap-2 text-slate-500 dark:text-slate-300">
                    <Warehouse className="w-4 h-4" />

                    <span className="font-medium">
                      {item.warehouseName}
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-100 dark:bg-slate-800 p-3 shadow-sm">
                  <Package className="w-7 h-7 text-slate-700 dark:text-white" />
                </div>
              </div>

              <div className="mt-6">
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  Unit Price
                </div>

                <div className="text-4xl font-black tracking-tight mt-1 text-slate-900 dark:text-white">
                  ₹
                  {item.price.toLocaleString()}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <Badge className="rounded-full px-4 py-1.5">
                  Total:{" "}
                  {item.totalQuantity}
                </Badge>

                <Badge
                  variant="secondary"
                  className="rounded-full px-4 py-1.5"
                >
                  Reserved:{" "}
                  {item.reservedQuantity}
                </Badge>

                <Badge
                  className="rounded-full px-4 py-1.5"
                  variant={
                    item.availableQuantity >
                    0
                      ? "default"
                      : "destructive"
                  }
                >
                  Available:{" "}
                  {item.availableQuantity}
                </Badge>
              </div>

              {item.availableQuantity <=
                0 && (
                <div className="mt-5 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 p-4 text-sm text-red-700 dark:text-red-300 font-medium">
                  ⚠️ This product is
                  currently out of stock.
                </div>
              )}

              <div className="mt-6">
                <ReserveDialog
                  item={item}
                  onSuccess={
                    fetchProducts
                  }
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ACTIVE RESERVATIONS */}
      <div className="mt-16">
        <ActiveReservations />
      </div>
    </main>
  );
}