import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 bg-background">
      <div className="flex flex-col items-center rounded-lg border p-8 shadow-md bg-primary-foreground">
        <ShieldAlert className="h-12 w-12 text-destructive mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2 dark:text-gray-100">
          Access Denied
        </h1>
        <p className="text-gray-600 mb-6 text-center dark:text-gray-300">
          You do not have permission to view this page.
          Please check your account role or log in with the correct credentials.
        </p>
        <Link href="/">
          <Button variant={"link"}>Go Home</Button>
        </Link>
      </div>
    </div>
  );
}
