"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Sidebar } from "../ui/sidebar";
import { useAllAds } from "@/hooks/use-all-ads";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

function AdAside() {
  const { data: ads = [] } = useAllAds();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Rotate ads every 15s
  useEffect(() => {
    if (ads.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 5) % ads.length);
    }, 15000);

    return () => clearInterval(interval);
  }, [ads.length]);

  const visibleAds = ads.slice(currentIndex, currentIndex + 5);

  // Increment views whenever visibleAds changes
  useEffect(() => {
    visibleAds.forEach(async (ad) => {
      await supabase.rpc("increment_ad_view", { ad_id: ad.id });
    });
  }, [visibleAds]);

  const handleClick = async (ad: AdItem) => {
    await supabase.rpc("increment_ad_click", { ad_id: ad.id });
  };

  return (
    <Sidebar side="right">
      <div className="p-4 space-y-4">
        {visibleAds.map((ad) => (
          <Link
            key={ad.id}
            href={`/products/${ad.id}`}
            onClick={() => handleClick(ad)}
          >
            <div className="relative cursor-pointer">
              <Image
                src={ad.image || ""}
                alt={ad.product_name || "ad"}
                className="size-36 rounded-md object-cover"
                height={176}
                width={176}
              />
              <span className="absolute top-1 left-1 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
                Ad
              </span>
            </div>
          </Link>
        ))}
      </div>
    </Sidebar>
  );
}

export default AdAside;
