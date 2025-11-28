"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { useRouter } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { createProductWithOffersAction, updateProductWithOffersAction } from "@/actions/product.actions"

import { productSchema, ProductFormValues } from "./product.schema"
import ProductFormFields from "./product-form-fields"
import ProductFormImages from "./product-form-images"
import ProductFormOffers from "./product-form-offers"

function ProductForm({
  editable,
  defaultValues,
  productId,
}: {
  editable?: boolean
  defaultValues?: ProductFormValues
  productId?: string | number
}) {
  const [localFiles, setLocalFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [existingImages, setExistingImages] = useState<string[]>(defaultValues?.images || [])
  const router = useRouter()

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: defaultValues ?? {
      name: "",
      description: "",
      images: [],
      offers: [],
      price: 0,
      qty: 0,
      qty_unit: "",
      qty_available: 0,
    },
  })

  const onSubmit: SubmitHandler<ProductFormValues> = async (values) => {
    if (existingImages.length === 0 && localFiles.length === 0) {
      form.setError("images", { message: "At least one image is required" })
      return
    }

    setUploading(true)
    try {
      const uploadedUrls: string[] = []
      for (const file of localFiles) {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("fileName", file.name)

        const res = await fetch("/api/upload", { method: "POST", body: formData })
        const data = await res.json()
        if (data?.url) uploadedUrls.push(data.url)
        else throw new Error("Image upload failed")
      }

      const finalImages = [...existingImages, ...uploadedUrls]

      if (editable && productId) {
        await updateProductWithOffersAction(productId, {
          ...values,
          images: finalImages,
          offers: values.offers.map(({ expiry, ...rest }) => ({
            ...rest,
            percentage: rest.percentage ?? undefined,
            amount: rest.amount ?? undefined,
            qty: rest.qty ?? undefined,
            price: rest.price ?? undefined,
            expiry: expiry ?? undefined,
          }))
        })
        
        router.push("/business/listings");
        toast.success("Product updated successfully.")
      } else {
        await createProductWithOffersAction({
          ...values,
          images: finalImages,
          offers: values.offers.map(({ expiry, ...rest }) => ({
            ...rest,
            percentage: rest.percentage ?? undefined,
            amount: rest.amount ?? undefined,
            qty: rest.qty ?? undefined,
            price: rest.price ?? undefined,
            expiry: expiry ?? undefined,
          }))
        })
        router.push("/business/listings");
        toast.success("Product created successfully.")
      }

      router.push(`/business/listings`)
    } catch (err: unknown) {
      console.error(err)

      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong while saving the product."

      toast.error(message)
    } finally {
    setUploading(false)
  }

}

return (
  <Form {...form}>
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="max-w-3xl mx-auto bg-card rounded-2xl shadow-md border p-8 space-y-8"
    >
      {/* Header */}
      <div className="space-y-1 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">
          {editable ? "Update Product" : "Add New Product"}
        </h2>
        <p className="text-sm text-muted-foreground">
          Fill in the details below to {editable ? "update" : "create"} your product.
        </p>
      </div>

      {/* Fields */}
      <ProductFormFields control={form.control} />

      {/* Images */}
      <ProductFormImages
        form={form}
        localFiles={localFiles}
        setLocalFiles={setLocalFiles}
        existingImages={existingImages}
        setExistingImages={setExistingImages}
        uploading={uploading}
      />

      {/* Offers */}
      <ProductFormOffers form={form} />

      {/* Submit */}
      <div className="pt-4">
        <Button
          type="submit"
          disabled={uploading}
          className="w-full rounded-xl text-base font-medium shadow-sm"
        >
          {editable ? "Update Product" : "Add Product"}
        </Button>
      </div>
    </form>
  </Form>
)
}

export default ProductForm
