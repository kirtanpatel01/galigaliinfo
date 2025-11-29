"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
// import { FaShoppingCart, FaDollarSign, FaBoxOpen, FaStar, FaTag } from "react-icons/fa";
// import CountUp from "react-countup";

import RecentOrders from "@/components/dashboard/recent-orders";
import TopProducts from "@/components/dashboard/top-selling";
import LowStock from "@/components/dashboard/low-stock";
import AdsPerformance from "@/components/dashboard/ad-performance";
import ActiveOffers from "@/components/dashboard/active-offers";
import Reviews from "@/components/dashboard/reviews";

export default function DashboardPage() {
  const { user, loading, error } = useCurrentUser();
  const [shopId, setShopId] = useState("");

  useEffect(() => {
    if (user) setShopId(user.id);
    else if (error) toast.error(error.message);
  }, [user, error]);

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        {/* Metrics Skeleton */}
        {/* <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse bg-card h-24 rounded shadow" />
          ))}
        </div> */}

        {/* Cards Skeleton */}
        {[...Array(5)].map((_, i) => (
          <div key={i} className="animate-pulse bg-card h-48 rounded shadow" />
        ))}
      </div>
    );
  }

  // Example metrics data
  // const metrics = [
  //   { label: "Total Orders", value: 128, icon: <FaShoppingCart className="w-5 h-5 mr-2" /> },
  //   { label: "Revenue", value: 45230, icon: <FaDollarSign className="w-5 h-5 mr-2" /> },
  //   { label: "Active Products", value: 12, icon: <FaBoxOpen className="w-5 h-5 mr-2" /> },
  //   { label: "Avg. Rating", value: 4.3, icon: <FaStar className="w-5 h-5 mr-2" /> },
  //   { label: "Active Offers", value: 3, icon: <FaTag className="w-5 h-5 mr-2" /> },
  // ];

  return (
    <div className="p-6 space-y-6">
      {/* Top Metrics - Grid */}
      {/* <div className="grid grid-cols-1 md:grid-cols-5 gap-4 sticky top-0 z-20 bg-background p-4 rounded shadow mb-6">
        {metrics.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="bg-card rounded-lg p-4 flex items-center justify-between shadow border border-border"
          >
            <div className="flex items-center text-lg font-semibold text-card-foreground">
              {m.icon} <CountUp end={m.value} duration={1.5} separator="," />
            </div>
            <span className="text-sm text-muted-foreground">{m.label}</span>
          </motion.div>
        ))}
      </div> */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <RecentOrders shopId={shopId} />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="h-full"
        >
          <TopProducts shopId={shopId} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="h-full"
        >
          <LowStock shopId={shopId} />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <AdsPerformance shopId={shopId} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <ActiveOffers shopId={shopId} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Reviews shopId={shopId} />
      </motion.div>
    </div>
  );
}
