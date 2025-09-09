"use client"

import { UseFormReturn } from "react-hook-form"
import { ProductFormValues } from "./product.schema"
import OfferDialog from "@/components/offer-dialog"

export default function ProductFormOffers({ form }: { form: UseFormReturn<ProductFormValues> }) {
  return <OfferDialog form={form} />
}
