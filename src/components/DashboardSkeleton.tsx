import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map(
          (_, i) => (
            <div
              key={i}
              className="rounded-2xl border bg-white p-6 shadow-sm"
            >
              <Skeleton className="h-4 w-24 mb-4" />

              <Skeleton className="h-10 w-16" />
            </div>
          )
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map(
          (_, i) => (
            <div
              key={i}
              className="rounded-2xl border bg-white p-6 shadow-sm"
            >
              <Skeleton className="h-6 w-40 mb-4" />

              <Skeleton className="h-4 w-28 mb-3" />

              <Skeleton className="h-10 w-24 mb-4" />

              <div className="flex gap-2 mb-5">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
              </div>

              <Skeleton className="h-10 w-full" />
            </div>
          )
        )}
      </div>
    </div>
  );
}