"use client"

export function ProductSkeleton() {
  return (
    <div className="bg-card rounded-lg overflow-hidden animate-pulse">
      <div className="h-48 bg-muted animate-shimmer" />
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="h-6 bg-muted rounded w-3/4 animate-shimmer" />
          <div className="h-6 bg-muted rounded w-16 animate-shimmer" />
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded w-full animate-shimmer" />
          <div className="h-4 bg-muted rounded w-2/3 animate-shimmer" />
        </div>
        <div className="flex justify-between items-center">
          <div className="h-4 bg-muted rounded w-20 animate-shimmer" />
          <div className="h-8 bg-muted rounded w-24 animate-shimmer" />
        </div>
      </div>
    </div>
  )
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  )
}
