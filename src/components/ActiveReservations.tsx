"use client";

import {
  useEffect,
  useState,
} from "react";

import { Reservation } from "@/types/reservation";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import { toast } from "sonner";

import {
  Clock3,
  CheckCircle2,
  XCircle,
  PackageCheck,
} from "lucide-react";

export default function ActiveReservations() {
  const [reservations, setReservations] =
    useState<Reservation[]>([]);

  function getRemainingTime(
    expiresAt: string
  ) {
    const totalSeconds = Math.max(
      0,
      Math.floor(
        (new Date(expiresAt).getTime() -
          Date.now()) /
          1000
      )
    );

    const minutes = Math.floor(
      totalSeconds / 60
    );

    const seconds = totalSeconds % 60;

    return `${minutes
      .toString()
      .padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }

  async function fetchReservations() {
    try {
      const res = await fetch(
        "/api/reservations/all"
      );

      const data = await res.json();

      setReservations(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchReservations();

    const interval = setInterval(
      async () => {
        await fetch(
          "/api/reservations/cleanup",
          {
            method: "POST",
          }
        );

        fetchReservations();
      },
      5000
    );

    const timer = setInterval(() => {
      setReservations((prev) => [
        ...prev,
      ]);
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(timer);
    };
  }, []);

  async function confirmReservation(
    reservationId: string
  ) {
    try {
      const res = await fetch(
        "/api/reservations/confirm",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            reservationId,
          }),
        }
      );

      if (!res.ok) {
        throw new Error();
      }

      toast.success(
        "Reservation confirmed"
      );

      fetchReservations();
    } catch {
      toast.error(
        "Confirmation failed"
      );
    }
  }

  async function releaseReservation(
    reservationId: string
  ) {
    try {
      const res = await fetch(
        "/api/reservations/release",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            reservationId,
          }),
        }
      );

      if (!res.ok) {
        throw new Error();
      }

      toast.success(
        "Reservation released"
      );

      fetchReservations();
    } catch {
      toast.error("Release failed");
    }
  }

  return (
    <div className="mt-20">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Active Reservations
          </h2>

          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Real-time reservation
            lifecycle monitoring and
            inventory actions.
          </p>
        </div>

        <Badge className="rounded-full px-5 py-2 text-sm">
          {reservations.length} Active
        </Badge>
      </div>

      <div className="grid gap-5">
        {reservations.length === 0 ? (
          <Card className="rounded-[2rem] border-dashed border-2 bg-white/70 dark:bg-slate-900/70 backdrop-blur shadow-sm">
            <CardContent className="p-12 flex flex-col items-center justify-center text-center">
              <div className="text-7xl mb-5">
                📦
              </div>

              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
                No Active Reservations
              </h3>

              <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-md leading-relaxed">
                Reservations will appear
                here with live countdown
                timers, confirmation
                actions, and automatic
                expiry handling.
              </p>
            </CardContent>
          </Card>
        ) : (
          reservations.map((r) => (
            <Card
              key={r.id}
              className="rounded-[2rem] border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <CardContent className="p-7">
                <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
                  {/* LEFT SIDE */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="rounded-2xl bg-slate-100 dark:bg-slate-800 p-3">
                        <PackageCheck className="w-6 h-6 text-slate-700 dark:text-white" />
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                          Reservation
                        </h3>

                        <p className="text-sm text-slate-500 break-all">
                          {r.id}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 mt-5">
                      <Badge className="rounded-full px-4 py-1.5">
                        Quantity: {r.quantity}
                      </Badge>

                      {r.status ===
                        "PENDING" && (
                        <Badge className="rounded-full px-4 py-1.5 bg-orange-500 hover:bg-orange-500">
                          Pending
                        </Badge>
                      )}

                      {r.status ===
                        "CONFIRMED" && (
                        <Badge className="rounded-full px-4 py-1.5 bg-green-600 hover:bg-green-600">
                          Confirmed
                        </Badge>
                      )}

                      {r.status ===
                        "EXPIRED" && (
                        <Badge className="rounded-full px-4 py-1.5 bg-red-600 hover:bg-red-600">
                          Expired
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* RIGHT SIDE */}
                  <div className="flex flex-col items-start xl:items-end gap-4">
                    {r.status ===
                      "PENDING" && (
                      <div className="flex items-center gap-3 rounded-2xl bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900 px-5 py-3">
                        <Clock3 className="w-5 h-5 text-orange-600" />

                        <div>
                          <div className="text-xs uppercase tracking-wide text-orange-600 font-semibold">
                            Expires In
                          </div>

                          <div className="text-2xl font-black text-orange-700 dark:text-orange-300">
                            {getRemainingTime(
                              r.expiresAt
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {r.status ===
                      "CONFIRMED" && (
                      <div className="flex items-center gap-2 text-green-600 font-semibold">
                        <CheckCircle2 className="w-5 h-5" />
                        Successfully
                        Confirmed
                      </div>
                    )}

                    {r.status ===
                      "EXPIRED" && (
                      <div className="flex items-center gap-2 text-red-600 font-semibold">
                        <XCircle className="w-5 h-5" />
                        Reservation
                        Expired
                      </div>
                    )}

                    {r.status ===
                      "PENDING" && (
                      <div className="flex gap-3">
                        <Button
                          className="rounded-xl shadow-md hover:shadow-lg"
                          onClick={() =>
                            confirmReservation(
                              r.id
                            )
                          }
                        >
                          Confirm
                        </Button>

                        <Button
                          variant="destructive"
                          className="rounded-xl shadow-md hover:shadow-lg"
                          onClick={() =>
                            releaseReservation(
                              r.id
                            )
                          }
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}