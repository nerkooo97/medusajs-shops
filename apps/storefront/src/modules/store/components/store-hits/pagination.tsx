"use client"

import { usePagination } from "react-instantsearch"

import { clx } from "@modules/common/components/ui"

const SearchPagination = () => {
  const { pages, currentRefinement, nbPages, refine } = usePagination({
    padding: 2,
  })

  if (nbPages <= 1) {
    return null
  }

  const renderPage = (page: number) => (
    <button
      key={page}
      className={clx(
        "min-w-10 h-10 px-3 flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-150",
        {
          "bg-[#0053E2] text-white shadow-xs cursor-default": page === currentRefinement,
          "bg-card hover:bg-muted text-foreground border border-border/70 hover:border-[#0053E2]/40": page !== currentRefinement,
        }
      )}
      disabled={page === currentRefinement}
      onClick={() => refine(page)}
    >
      {page + 1}
    </button>
  )

  const renderEllipsis = (key: string) => (
    <span
      key={key}
      className="min-w-8 h-10 flex items-center justify-center text-muted-foreground select-none"
    >
      ...
    </span>
  )

  const lastPage = nbPages - 1

  return (
    <div className="flex justify-center w-full mt-12">
      <div className="flex gap-3 items-end" data-testid="product-pagination">
        {!pages.includes(0) && renderPage(0)}
        {!pages.includes(0) && !pages.includes(1) && renderEllipsis("start")}
        {pages.map(renderPage)}
        {!pages.includes(lastPage) &&
          !pages.includes(lastPage - 1) &&
          renderEllipsis("end")}
        {!pages.includes(lastPage) && renderPage(lastPage)}
      </div>
    </div>
  )
}

export default SearchPagination
