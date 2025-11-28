"use client"

import ShowcaseCard from "@/components/showcase/ShowcaseCard"
import { Input } from "../ui/input"
import Link from "next/link"
import { Button } from "../ui/button"
import { useMemo, useState } from "react"
import { ShowcaseCardItem } from "@/types/product"

const linkMap = {
  product: (id: number) => `/products/${id}`,
  shop: (id: number) => `/shops/${id}`,
  "self-pick-up": (id: number) => `/normal/self-pick-up/shops/${id}`,
}

function ShowcasePage({ type, showcaseItems }: {
  type: "shop" | "product" | "self-pick-up" | "business";
  showcaseItems: ShowcaseCardItem[]
}) {
  const [query, setQuery] = useState("")

  const filteredItems = useMemo(() => {
    let items = showcaseItems

    // Hide hidden products only for non-business views
    if (type !== "business") {
      items = items.filter((item) => !item.isHidden)
    }

    if (query) {
      items = items.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.address.toLowerCase().includes(query.toLowerCase())
      )
    }

    return items
  }, [query, showcaseItems, type])

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="w-full border-b fixed h-[var(--header-height)] flex gap-6 items-center bg-background px-6">
        <Input
          className="w-96 rounded-full"
          placeholder={`Search for ${type}...`}
          onChange={(e) => setQuery(e.target.value)}
        />
        {type === "business" && (
          <Link href="/business/listings/new">
            <Button>Add a new product</Button>
          </Link>
        )}
      </div>

      {/* Cards */}
      {filteredItems.length === 0 ? (
        <div className="w-full p-6 mt-[var(--header-height)] text-center text-gray-500">
          {query
            ? `No products found matching "${query}".`
            : `No products available right now.`}
        </div>
      ) : (
        <ul className="w-full p-6 flex flex-wrap gap-6 mt-[var(--header-height)]">
          {filteredItems.map((item) => (
            <li key={item.id} className="!p-0 !bg-transparent hover:!bg-transparent">
              {type !== "business" ? (
                <Link href={linkMap[type](item.id)}>
                  <ShowcaseCard type={type} {...item} />
                </Link>
              ) : (
                <ShowcaseCard type={type} {...item} />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ShowcasePage
