"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "../ui/button";

function ProductImageGallery({ images, name }: { images: string[]; name: string }) {
  const [activeIndex, setActiveIndex] = useState(0)

  const scrollRow = (dir: "left" | "right") => {
    const row = document.getElementById("thumb-row")
    if (!row) return
    row.scrollBy({ left: dir === "left" ? -200 : 200, behavior: "smooth" })
  }

  return (
    <div className="space-y-4 border rounded-md p-4">
      <h2 className='mb-2 text-2xl font-bold capitalize'>{name}</h2>
      {/* Active Image */}
      <div className="relative w-full h-[250px] sm:h-[300px] lg:h-[350px] border rounded-md overflow-hidden">
        <Image
          src={images[activeIndex]}
          alt={`${name} image ${activeIndex + 1}`}
          fill
          className="object-cover"
        />
      </div>

      {/* Thumbnail Row */}
      <div className="relative flex items-center">
        {/* Left Button */}
        <Button
          size={"icon"}
          onClick={() => scrollRow("left")}>
          <ChevronLeft className="w-5 h-5" />
        </Button>

        <div
          id="thumb-row"
          className="flex gap-2 overflow-x-auto no-scrollbar px-8"
        >
          {images.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative w-20 h-20 flex-shrink-0 border rounded-md cursor-pointer overflow-hidden ${
                idx === activeIndex ? "ring-2 ring-primary" : "opacity-80 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`${name} thumbnail ${idx + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Right Button */}
        <Button
          size={"icon"}
          onClick={() => scrollRow("right")}
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}

export default ProductImageGallery
