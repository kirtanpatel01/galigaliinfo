import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function page() {
  return (
    <div className="min-h-[90%] flex justify-center items-center">
      <Link href={"/business/dashboard"}>
        <Button className="cursor-pointer">Go to the Dashboard</Button>
      </Link>
    </div>
  );
}

export default page;
