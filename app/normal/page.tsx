import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function page() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  return (
    <div className="">Normal User Page</div>
  );
}
