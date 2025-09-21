'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import OfferDialog from './offer-dialog'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createProductWithOffersAction, updateProductWithOffersAction } from '@/actions/product.actions'
import { X } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from './ui/textarea'
import Image from 'next/image'
import { ProductFormValues, productSchema } from './product-form/product.schema'

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
  const router = useRouter();

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

  type Field =
    | { name: keyof ProductFormValues; label: string; placeholder: string; textarea?: false; type?: string }
    | { name: keyof ProductFormValues; label: string; placeholder: string; textarea: true; type?: string }


  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newFiles = [...localFiles, ...Array.from(files)]
    setLocalFiles(newFiles)

    form.setValue(
      "images",
      [...existingImages, ...newFiles.map((f) => f.name)],
      { shouldValidate: true }
    )
  }

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

      // Strip id from offers before sending to server
      const normalizedOffers = values.offers.map(({ ...rest }) => ({
        ...rest,
        percentage: rest.percentage ?? undefined,
        amount: rest.amount ?? undefined,
        qty: rest.qty ?? undefined,
        price: rest.price ?? undefined,
        expiry: rest.expiry ?? null, // RPC expects null for empty expiry
      }))

      await (
        editable && productId
          ? updateProductWithOffersAction(productId, { ...values, images: finalImages, offers: normalizedOffers })
          : createProductWithOffersAction({ ...values, images: finalImages, offers: normalizedOffers })
      )

      toast.success(editable ? "Product updated successfully." : "Product created successfully.")
      router.push(`/business/listings`)
    } catch (err: unknown) {
      console.error(err)
      toast.error(err instanceof Error ? err.message : "Something went wrong while saving the product.")
    } finally {
      setUploading(false)
    }
  }

  const fields: Field[] = [
    { name: "name", label: "Product Name", placeholder: "Enter product name" },
    { name: "description", label: "Description", placeholder: "Enter product details...", textarea: true },
    { name: "price", label: "Price", placeholder: "Enter product price", type: "number" },
    { name: "qty", label: "Quantity (per price)", placeholder: "Enter the quantity for above price", type: "number" },
    { name: "qty_unit", label: "Quantity Unit", placeholder: "Enter product quantity unit" },
    { name: "qty_available", label: "Available Quantity", placeholder: "Enter the available quantity in your shop", type: "number" },
  ]


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-3xl mx-auto bg-card rounded-2xl shadow-md border border-border p-8 space-y-8">
        <div className="space-y-1 text-center">
          <h2 className="text-2xl font-semibold tracking-tight">{editable ? "Update Product" : "Add New Product"}</h2>
          <p className="text-sm text-muted-foreground">Fill in the details below to {editable ? "update" : "create"} your product.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {fields.map(({ name, label, placeholder, type, textarea }) => (
            <FormField key={name} control={form.control} name={name} render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="font-medium">{label}</FormLabel>
                <FormControl>
                  {textarea ? (
                    <Textarea {...field} placeholder={placeholder} value={typeof field.value === "string" ? field.value : ""} rows={4} className="resize-none rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500" />
                  ) : (
                    <Input {...field} type={type ?? "text"} placeholder={placeholder}
                      value={typeof field.value === "string" || typeof field.value === "number" ? field.value : ""}
                      onChange={(e) => {
                        const val = e.target.value
                        field.onChange(type === "number" ? (val === "" ? undefined : Number(val)) : val)
                      }}
                      className="rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  )}
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )} />
          ))}
        </div>

        {/* File Upload */}
        <div className="space-y-3">
          <FormLabel className="font-medium">Product Images</FormLabel>
          <Input type="file" multiple onChange={handleFileSelect} className="cursor-pointer rounded-xl border-border file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-blue-700" />
          {uploading && <p className="text-blue-500 text-sm">Uploading...</p>}
          {form.formState.errors.images && <p className="text-red-500 text-sm">{form.formState.errors.images.message}</p>}

          <div className="flex flex-wrap gap-3">
            {existingImages.map((url, idx) => (
              <div key={idx} className="relative w-20 h-20 rounded-xl overflow-hidden shadow-md group">
                <Image src={url} alt="preview" className="w-full h-full object-cover" width={80} height={80} />
                <button type="button" onClick={() => setExistingImages(existingImages.filter((_, i) => i !== idx))}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-90 hover:opacity-100">
                  <X size={14} />
                </button>
              </div>
            ))}

            {localFiles.map((file, idx) => (
              <div key={idx} className="relative w-20 h-20 rounded-xl overflow-hidden shadow-md group">
                <Image src={URL.createObjectURL(file)} alt="preview" className="w-full h-full object-cover" width={80} height={80} />
                <button type="button" onClick={() => setLocalFiles(localFiles.filter((_, i) => i !== idx))}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-90 hover:opacity-100">
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Offers */}
        <OfferDialog form={form} />

        {/* Submit Button */}
        <div className="pt-4">
          <Button type="submit" disabled={uploading} className="w-full rounded-xl text-base font-medium shadow-sm">
            {editable ? "Update Product" : "Add Product"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default ProductForm
