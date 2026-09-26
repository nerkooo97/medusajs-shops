import repeat from "@lib/util/repeat"
import { HttpTypes } from "@medusajs/types"
import { Heading, Table } from "@modules/common/components/ui"

import Item from "@modules/cart/components/item"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"

type ItemsTemplateProps = {
  cart?: HttpTypes.StoreCart
}

const ItemsTemplate = ({ cart }: ItemsTemplateProps) => {
  const items = cart?.items
  const totalCount = items?.reduce((acc, item) => acc + item.quantity, 0) || 0

  return (
    <div className="bg-card rounded-2xl border border-border p-5 sm:p-6 shadow-2xs">
      <div className="pb-4 flex items-center justify-between border-b border-border">
        <h1 className="text-lg sm:text-xl font-bold text-foreground tracking-tight">
          Vaša korpa
        </h1>
        <span className="text-xs font-semibold text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
          {totalCount} {totalCount === 1 ? "artikal" : totalCount < 5 ? "artikla" : "artikala"}
        </span>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <Table.Header className="border-b border-border">
            <Table.Row className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              <Table.HeaderCell className="!pl-0 py-3">Proizvod</Table.HeaderCell>
              <Table.HeaderCell className="py-3"></Table.HeaderCell>
              <Table.HeaderCell className="py-3">Količina</Table.HeaderCell>
              <Table.HeaderCell className="hidden small:table-cell py-3">
                Cijena
              </Table.HeaderCell>
              <Table.HeaderCell className="text-right py-3">
                Ukupno
              </Table.HeaderCell>
              <Table.HeaderCell className="!pr-0 py-3 w-10 text-right">
                <span className="sr-only">Ukloni</span>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body className="divide-y divide-border">
            {items
              ? items
                  .sort((a, b) => {
                    return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
                  })
                  .map((item) => {
                    return (
                      <Item
                        key={item.id}
                        item={item}
                        currencyCode={cart?.currency_code}
                      />
                    )
                  })
              : repeat(5).map((i) => {
                  return <SkeletonLineItem key={i} />
                })}
          </Table.Body>
        </Table>
      </div>
    </div>
  )
}

export default ItemsTemplate
