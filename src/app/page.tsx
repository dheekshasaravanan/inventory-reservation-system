import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
      <div className="max-w-3xl text-center">
        <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm mb-6">
          🚀 Real-Time Inventory Platform
        </div>

        <h1 className="text-5xl lg:text-6xl font-black tracking-tight">
          Inventory Reservation
          System
        </h1>

        <p className="mt-6 text-lg text-slate-400 leading-relaxed">
          A full-stack inventory
          reservation platform with
          concurrency-safe stock
          handling, automatic expiry
          management, and real-time
          warehouse tracking.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <div className="rounded-full bg-white/5 border border-white/10 px-4 py-2 text-sm">
            ✅ Concurrency Safe
          </div>

          <div className="rounded-full bg-white/5 border border-white/10 px-4 py-2 text-sm">
            ⏳ Auto Expiry
          </div>

          <div className="rounded-full bg-white/5 border border-white/10 px-4 py-2 text-sm">
            📦 Live Inventory
          </div>
        </div>

        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center mt-10 rounded-2xl bg-white text-slate-900 px-8 py-4 font-semibold hover:scale-105 transition-all"
        >
          Launch Dashboard
        </Link>
      </div>
    </main>
  );
}