import Link from "next/link";

import {
  ArrowRight,
  ShieldCheck,
  Clock3,
  Database,
  BarChart3,
} from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* HERO */}
      <section className="relative px-6 lg:px-12 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_35%)]" />

        <div className="relative max-w-7xl mx-auto">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 backdrop-blur px-5 py-2 text-sm">
            🚀 Production-Grade Inventory
            Intelligence
          </div>

          <div className="mt-8 grid lg:grid-cols-2 gap-16 items-center">
            {/* LEFT */}
            <div>
              <h1 className="text-6xl lg:text-7xl font-black tracking-tight leading-tight">
                Inventory
                Reservation
                Platform
              </h1>

              <p className="mt-8 text-xl text-slate-300 leading-relaxed">
                A modern full-stack
                inventory reservation
                platform with
                concurrency-safe stock
                handling, automated
                expiry lifecycle, and
                real-time warehouse
                intelligence.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 rounded-2xl bg-white text-slate-900 px-7 py-4 font-semibold hover:scale-105 transition-all"
                >
                  Launch Dashboard
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <a
                  href="https://github.com/dheekshasaravanan/inventory-reservation-system"
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur px-7 py-4 font-semibold hover:bg-white/10 transition-all"
                >
                  View GitHub
                </a>
              </div>
            </div>

            {/* RIGHT */}
            <div className="grid grid-cols-2 gap-5">
              <div className="rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur p-8">
                <ShieldCheck className="w-10 h-10 text-emerald-400" />

                <h3 className="mt-5 text-2xl font-bold">
                  Concurrency Safe
                </h3>

                <p className="mt-3 text-slate-400">
                  Prevents overselling
                  using atomic database
                  transactions.
                </p>
              </div>

              <div className="rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur p-8">
                <Clock3 className="w-10 h-10 text-orange-400" />

                <h3 className="mt-5 text-2xl font-bold">
                  Auto Expiry
                </h3>

                <p className="mt-3 text-slate-400">
                  Reservations expire
                  automatically and
                  restore stock safely.
                </p>
              </div>

              <div className="rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur p-8">
                <Database className="w-10 h-10 text-blue-400" />

                <h3 className="mt-5 text-2xl font-bold">
                  PostgreSQL
                </h3>

                <p className="mt-3 text-slate-400">
                  Powered by Neon DB,
                  Prisma ORM, and
                  transaction-safe APIs.
                </p>
              </div>

              <div className="rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur p-8">
                <BarChart3 className="w-10 h-10 text-pink-400" />

                <h3 className="mt-5 text-2xl font-bold">
                  Live Analytics
                </h3>

                <p className="mt-3 text-slate-400">
                  Real-time inventory
                  insights with premium
                  dashboard UI.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-6 lg:px-12 py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-5xl font-black tracking-tight">
              Engineered for
              Production
            </h2>

            <p className="mt-6 text-xl text-slate-400">
              Built using modern
              full-stack engineering
              practices with scalability,
              consistency, and reliability
              in mind.
            </p>
          </div>

          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {[
              "Real-time inventory tracking",
              "Warehouse-level stock management",
              "Reservation lifecycle automation",
              "Retry-safe idempotent APIs",
              "Automatic inventory restoration",
              "Responsive SaaS dashboard",
            ].map((feature) => (
              <div
                key={feature}
                className="rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur p-7 text-lg font-medium"
              >
                ✅ {feature}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 px-6 lg:px-12 py-10 text-center text-slate-500">
        Built by Dheeksha Saravanan
      </footer>
    </main>
  );
}