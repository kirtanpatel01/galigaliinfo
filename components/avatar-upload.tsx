"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "./ui/label";

interface AvatarUploadProps {
  value: string; // current avatar URL or empty string
  fullName: string;
  onChange: (url: string) => void; // called after upload
}

export default function AvatarUpload({ value, fullName, onChange }: AvatarUploadProps) {
  const [uploading, setUploading] = useState(false);

  // Fallback avatar (from fullName initials)
  const fallbackAvatar = `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(fullName || "User")}`;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", file.name);

      // Upload to your Next.js API route
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      onChange(data.url); // Pass URL back to form
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-24 h-24 rounded-full overflow-hidden border">
        <Image
          src={value || fallbackAvatar}
          alt="Avatar"
          fill
          unoptimized
          className="object-cover"
        />
      </div>

      <Label>
        <Input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <Button asChild variant="secondary" size="sm" disabled={uploading}>
          <span>{uploading ? "Uploading..." : "Update Photo"}</span>
        </Button>
      </Label>
    </div>
  );
}
