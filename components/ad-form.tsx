"use client";

import React, { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import Image from "next/image";
import { X } from "lucide-react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useProductsByUser } from "@/hooks/use-products-by-user";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useAdsMutations } from "@/hooks/use-ad-mutations";
import { toast } from "sonner";
import { AdItem } from "@/types/ads";

function AdForm({ editable, ad }: { editable: boolean; ad?: AdItem }) {
  const { user } = useCurrentUser();
  const { data: products = [] } = useProductsByUser(user?.id || "");
  const { createAd, updateAd } = useAdsMutations();

  const [productId, setProductId] = useState<string>(ad?.product_id?.toString() || "");
  const [image, setImage] = useState<string | null>(ad?.image || null);

  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // handle file upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.url) {
        setImage(data.url);
        toast.success("Image uploaded successfully!");
      } else {
        console.error("Upload failed:", data);
        toast.error("Image upload failed");
      }
    } catch (err) {
      console.error("Error uploading:", err);
      toast.error("Something went wrong while uploading");
    } finally {
      setUploading(false);
    }
  };


  // save ad in supabase
  const handleSubmit = async () => {
    if (!user?.id) {
      toast.error("You must be logged in");
      return;
    }
    if (!productId) {
      toast.error("Please select a product");
      return;
    }
    if (!image) {
      toast.error("Please upload an image");
      return;
    }

    if (editable && ad) {
      updateAd.mutate(
        { id: ad.id, user_id: user.id, product_id: productId, image },
        { onSuccess: () => toast.success("Ad updated successfully!") }
      );
    } else {
      createAd.mutate(
        { user_id: user.id, product_id: productId, image },
        {
          onSuccess: () => {
            toast.success("Ad created successfully!");
            setProductId("");
            setImage(null);
          },
        }
      );
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {editable ? (
          <span className="px-2 py-1">Edit</span>
        ) : (
          <Button>Place Ad</Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editable ? "Edit Ad" : "Place Ad"}</DialogTitle>
        </DialogHeader>

        {/* Product Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Select Product
          </label>

          <Select value={productId?.toString()} onValueChange={(val) => setProductId((val))}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="-- Choose a product --" />
            </SelectTrigger>
            <SelectContent>
              {products.map((p) => (
                <SelectItem key={p.id} value={p.id.toString()}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Image Upload */}
        {/* Image Upload */}
        <div className="mb-4">
          {image ? (
            <div className="relative inline-block">
              <Image
                src={image}
                alt="ad-image"
                width={200}
                height={200}
                className="rounded-md object-cover"
              />
              <button
                type="button"
                onClick={() => setImage(null)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : uploading ? (
            <div className="flex items-center justify-center h-[200px] w-[200px] border rounded-md">
              <span className="text-sm text-gray-500">Uploading...</span>
            </div>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                Upload Image
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
                accept="image/*"
              />
            </>
          )}
        </div>


        {/* Submit */}
        <Button
          className="w-full"
          onClick={handleSubmit}
          disabled={createAd.isPending || updateAd.isPending || !productId || !image}
        >
          {createAd.isPending || updateAd.isPending
            ? "Saving..."
            : editable
              ? "Update Ad"
              : "Submit Ad"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default AdForm;
