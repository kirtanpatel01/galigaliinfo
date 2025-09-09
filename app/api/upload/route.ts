import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();

  const res = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
    method: "POST",
    headers: {
      Authorization: "Basic " + btoa(process.env.IMAGEKIT_PRIVATE_KEY + ":" + process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY),
    },
    body: formData,
  });

  const data = await res.json();
  return NextResponse.json(data);
}
