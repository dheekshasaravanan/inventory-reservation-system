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

  async function handleReserve() {
    try {
      setLoading(true);

      const res = await fetch(
        "/api/reservations",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            productId: item.productId,
            warehouseId:
              item.warehouseId,
            quantity,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      toast.success(
        "Reservation created successfully"
      );

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
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="w-full mt-5"
          disabled={
            item.availableQuantity <= 0
          }
        >
          Reserve Stock
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Reserve {item.productName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <Input
            type="number"
            min={1}
            max={item.availableQuantity}
            value={quantity}
            onChange={(e) =>
              setQuantity(
                Number(e.target.value)
              )
            }
          />

          <Button
            onClick={handleReserve}
            disabled={loading}
            className="w-full"
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