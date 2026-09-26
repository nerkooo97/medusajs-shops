"use client"

import { Table, Text, clx } from "@modules/common/components/ui"
import { updateLineItem } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import CartItemSelect from "@modules/cart/components/cart-item-select"
import ErrorMessage from "@modules/checkout/components/error-message"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Spinner from "@modules/common/icons/spinner"
import Thumbnail from "@modules/products/components/thumbnail"
import { Minus, Plus } from "lucide-react"
import { useState } from "react"

type ItemProps = {
  item: HttpTypes.StoreCartLineItem
  type?: "full" | "preview"
  currencyCode: string
}

const Item = ({ item, type = "full", currencyCode }: ItemProps) => {
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const changeQuantity = async (quantity: number) => {
    setError(null)
    setUpdating(true)

    await updateLineItem({
      lineId: item.id,
      quantity,
    })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setUpdating(false)
      })
  }

  // TODO: Update this to grab the actual max inventory
  const maxQtyFromInventory = 10
  const maxQuantity = item.variant?.manage_inventory ? 10 : maxQtyFromInventory

  return (
    <Table.Row className="w-full transition-colors hover:bg-muted/20" data-testid="product-row">
      <Table.Cell className="!pl-0 py-4 w-20 sm:w-24">
        <LocalizedClientLink
          href={`/products/${item.product_handle}`}
          className={clx("flex rounded-lg overflow-hidden border border-border/70 bg-muted/20 shrink-0", {
            "w-14 sm:w-16": type === "preview",
            "w-16 sm:w-20": type === "full",
          })}
        >
          <Thumbnail
            thumbnail={item.thumbnail}
            images={item.variant?.product?.images}
            size="square"
          />
        </LocalizedClientLink>
      </Table.Cell>

      <Table.Cell className="text-left py-4">
        <LocalizedClientLink
          href={`/products/${item.product_handle}`}
          className="text-sm font-semibold text-foreground hover:text-primary transition-colors line-clamp-2"
          data-testid="product-title"
        >
          {item.product_title}
        </LocalizedClientLink>
        <div className="mt-1">
          <LineItemOptions variant={item.variant} data-testid="product-variant" />
        </div>
      </Table.Cell>

      {type === "full" && (
        <Table.Cell className="py-4 align-middle">
          <div className="flex flex-col gap-1 items-start">
            <div className="inline-flex items-center border border-input rounded-lg h-9 bg-background shadow-2xs">
              <button
                type="button"
                disabled={item.quantity <= 1 || updating}
                onClick={() => changeQuantity(item.quantity - 1)}
                aria-label="Smanji količinu"
                className="size-8 flex items-center justify-center text-foreground hover:bg-muted active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all rounded-l-md cursor-pointer"
                data-testid="quantity-decrease-button"
              >
                <Minus className="size-3.5" />
              </button>
              <span
                className="w-8 text-center text-xs font-bold text-foreground select-none"
                data-testid="product-quantity-display"
              >
                {updating ? <Spinner className="inline size-3.5 animate-spin text-primary" /> : item.quantity}
              </span>
              <button
                type="button"
                disabled={item.quantity >= maxQuantity || updating}
                onClick={() => changeQuantity(item.quantity + 1)}
                aria-label="Povećaj količinu"
                className="size-8 flex items-center justify-center text-foreground hover:bg-muted active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all rounded-r-md cursor-pointer"
                data-testid="quantity-increase-button"
              >
                <Plus className="size-3.5" />
              </button>
            </div>
            <ErrorMessage error={error} data-testid="product-error-message" />
          </div>
        </Table.Cell>
      )}

      {type === "full" && (
        <Table.Cell className="hidden small:table-cell py-4 align-middle text-xs text-muted-foreground font-medium">
          <LineItemUnitPrice
            item={item}
            style="tight"
            currencyCode={currencyCode}
          />
        </Table.Cell>
      )}

      <Table.Cell className={clx("py-4 text-right align-middle", { "!pr-0": type === "preview" })}>
        <span
          className={clx("font-semibold text-sm text-foreground", {
            "!pr-0 flex flex-col items-end h-full justify-center": type === "preview",
          })}
        >
          {type === "preview" && (
            <span className="flex gap-x-1 ">
              <Text className="text-ui-fg-muted">{item.quantity}x </Text>
              <LineItemUnitPrice
                item={item}
                style="tight"
                currencyCode={currencyCode}
              />
            </span>
          )}
          <LineItemPrice
            item={item}
            style="tight"
            currencyCode={currencyCode}
          />
        </span>
      </Table.Cell>

      {type === "full" && (
        <Table.Cell className="!pr-0 py-4 text-right align-middle w-10">
          <DeleteButton id={item.id} data-testid="product-delete-button" />
        </Table.Cell>
      )}
    </Table.Row>
  )
}

export default Item
