import repeat from "@lib/util/repeat"

const SkeletonRelatedProducts = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6 pb-4 border-b border-border/80">
        <div>
          <div className="w-24 h-3 rounded bg-muted animate-pulse mb-1.5" />
          <div className="w-48 h-6 rounded bg-muted animate-pulse" />
        </div>
      </div>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
        {repeat(6).map((index) => (
          <li key={index} className="bg-card rounded-xl border border-border/80 p-2.5">
            <div className="aspect-square w-full rounded-lg bg-muted/40 animate-pulse mb-2" />
            <div className="w-3/4 h-3.5 rounded bg-muted/40 animate-pulse mb-1" />
            <div className="w-1/2 h-3 rounded bg-muted/40 animate-pulse mb-3" />
            <div className="w-1/3 h-4 rounded bg-muted/40 animate-pulse" />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SkeletonRelatedProducts
