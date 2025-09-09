"use client"

import { Input } from "@/components/ui/input"
import { FormLabel } from "@/components/ui/form"
import { X } from "lucide-react"
import { UseFormReturn } from "react-hook-form"
import { ProductFormValues } from "./product.schema"
import Image from "next/image"

type Props = {
  form: UseFormReturn<ProductFormValues>
  localFiles: File[]
  setLocalFiles: React.Dispatch<React.SetStateAction<File[]>>
  existingImages: string[]
  setExistingImages: React.Dispatch<React.SetStateAction<string[]>>
  uploading: boolean
}

export default function ProductFormImages({
  form,
  localFiles,
  setLocalFiles,
  existingImages,
  setExistingImages,
  uploading,
}: Props) {
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newFiles = [...localFiles, ...Array.from(files)]
    setLocalFiles(newFiles)

    form.setValue("images", [...existingImages, ...newFiles.map((f) => f.name)], { shouldValidate: true })
  }

  return (
    <div className="space-y-3">
      <FormLabel className="font-medium">Product Images</FormLabel>
      <Input
        type="file"
        multiple
        onChange={handleFileSelect}
        className="cursor-pointer rounded-xl border-gray-300 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-blue-700"
      />
      {uploading && <p className="text-blue-500 text-sm">Uploading...</p>}
      {form.formState.errors.images && (
        <p className="text-red-500 text-sm">{form.formState.errors.images.message}</p>
      )}

      <div className="flex flex-wrap gap-3">
        {/* Existing Images */}
        {existingImages.map((url, idx) => (
          <div key={idx} className="relative w-20 h-20 rounded-xl overflow-hidden shadow-md group">
            <Image src={url} alt="preview" className="w-full h-full object-cover" width={80} height={80} />
            <button
              type="button"
              onClick={() => setExistingImages(existingImages.filter((_, i) => i !== idx))}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-90 hover:opacity-100"
            >
              <X size={14} />
            </button>
          </div>
        ))}

        {/* Local Files */}
        {localFiles.map((file, idx) => (
          <div key={idx} className="relative w-20 h-20 rounded-xl overflow-hidden shadow-md group">
            <Image src={URL.createObjectURL(file)} alt="preview" className="w-full h-full object-cover" width={80} height={80} />
            <button
              type="button"
              onClick={() => setLocalFiles(localFiles.filter((_, i) => i !== idx))}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-90 hover:opacity-100"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
