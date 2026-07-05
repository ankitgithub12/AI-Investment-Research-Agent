import clsx from 'clsx';

/**
 * Skeleton loading placeholder components.
 * Used while research results are loading.
 */

export function SkeletonLine({ className }) {
  return (
    <div className={clsx('skeleton h-4 rounded', className)} />
  );
}

export function SkeletonBlock({ className }) {
  return (
    <div className={clsx('skeleton rounded-xl', className)} />
  );
}

export function SkeletonCard() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
      <SkeletonLine className="w-1/3 h-5" />
      <SkeletonLine className="w-full" />
      <SkeletonLine className="w-5/6" />
      <SkeletonLine className="w-4/6" />
    </div>
  );
}

export function SkeletonDashboard() {
  return (
    <div className="space-y-6 animate-pulse-soft">
      {/* Header skeleton */}
      <div className="flex items-center gap-4">
        <SkeletonBlock className="h-16 w-16 rounded-xl" />
        <div className="space-y-2 flex-1">
          <SkeletonLine className="w-48 h-7" />
          <SkeletonLine className="w-32 h-4" />
        </div>
        <SkeletonBlock className="h-10 w-28 rounded-full" />
      </div>

      {/* Score cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <SkeletonBlock key={i} className="h-28" />
        ))}
      </div>

      {/* Summary */}
      <SkeletonCard />

      {/* Grid of cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(6)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
