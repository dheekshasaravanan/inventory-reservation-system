"use client";

import { useState } from "react";

import { InventoryItem } from "@/types/inventory";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { toast } from "sonner";

interface Props {
  item: InventoryItem;

  onSuccess: () => void;
}

export default function ReserveDialog({
  item,
  onSuccess,
}: Props) {
  const [quantity, setQuantity] =
    useState(1);

  const [loading, setLoading] =
    useState(false);

  const [open, setOpen] =
    useState(false);

  async function handleReserve() {
    try {
      setLoading(true);

      const response = await fetch(
        "/api/reservations",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            "Idempotency-Key":
              crypto.randomUUID(),
          },

          body: JSON.stringify({
            productId: item.productId,

            warehouseId:
              item.warehouseId,

            quantity,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error
        );
      }

      toast.success(
        "Reservation created successfully"
      );

      setOpen(false);

      setQuantity(1);

      onSuccess();
    } catch (error: any) {
      toast.error(
        error.message ||
          "Reservation failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button
          className="w-full mt-5 rounded-xl h-11 font-semibold shadow-md hover:shadow-lg transition-all"
          disabled={
            item.availableQuantity <= 0
          }
        >
          {item.availableQuantity > 0
            ? "Reserve Stock"
            : "Out of Stock"}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md rounded-3xl border-0 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Reserve{" "}
            {item.productName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 mt-4">
          <div className="rounded-2xl bg-slate-100 dark:bg-slate-900 p-4">
            <div className="text-sm text-slate-500">
              Warehouse
            </div>

            <div className="font-semibold mt-1">
              {item.warehouseName}
            </div>

            <div className="text-sm text-slate-500 mt-3">
              Available Stock
            </div>

            <div className="text-2xl font-black mt-1">
              {
                item.availableQuantity
              }
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Quantity
            </label>

            <Input
              type="number"
              min={1}
              max={
                item.availableQuantity
              }
              value={quantity}
              onChange={(e) =>
                setQuantity(
                  Number(
                    e.target.value
                  )
                )
              }
              className="h-11 rounded-xl"
            />
          </div>

          <Button
            onClick={handleReserve}
            disabled={loading}
            className="w-full h-11 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
          >
            {loading
              ? "Reserving..."
              : "Confirm Reservation"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}