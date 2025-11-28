// components/offer-dialog.tsx
'use client'

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogDescription,
  DialogTitle
} from './ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select'
import { Button } from './ui/button'
import { X } from 'lucide-react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import type { UseFormReturn } from 'react-hook-form'
import { v4 as uuid } from "uuid"
import { generateDesc } from '@/lib/utils'
import type { Offer as OfferSchema, OfferType, ProductFormValues } from '@/components/product-form/product.schema'

type TempValues = {
  value?: string | number
  qty?: string | number
  price?: string | number
  expiry?: string
}

const OFFER_LABELS: Record<OfferType, string> = {
  "buy-get": "Buy one get one free",
  "percentage-discount": "Percentage Discount",
  "flat-amount-discount": "Flat Amount Discount",
  "quantity-discount": "Quantity Discount",
  "limited-time-offer": "Limited-Time Offer",
}

function OfferDialog({ form }: { form: UseFormReturn<ProductFormValues> }) {
  const offers = (form.watch("offers") || []) as OfferSchema[]
  const [offerType, setOfferType] = useState<OfferType | "">("")
  const [tempValues, setTempValues] = useState<TempValues>({})

  const addOffer = () => {
    if (offerType === "") return

    // Validate based on type
    if (
      (offerType === "percentage-discount" && !tempValues.value) ||
      (offerType === "flat-amount-discount" && !tempValues.value) ||
      (offerType === "quantity-discount" && (tempValues.qty === undefined || tempValues.price === undefined)) ||
      (offerType === "limited-time-offer" && (tempValues.value === undefined || tempValues.expiry === undefined))
    ) {
      alert("Please fill all required fields for this offer type.")
      return
    }

    const newOffer: OfferSchema = {
      id: uuid(),
      type: offerType,
      description: generateDesc(offerType, tempValues),

      percentage: offerType === "percentage-discount" ? Number(tempValues.value) : undefined,
      amount: offerType === "flat-amount-discount" ? Number(tempValues.value) : undefined,
      qty: offerType === "quantity-discount" ? Number(tempValues.qty) : undefined,
      price: offerType === "quantity-discount" ? Number(tempValues.price) : undefined,
      expiry: offerType === "limited-time-offer" ? (tempValues.expiry ?? undefined) : undefined,
    }

    form.setValue("offers", [...offers, newOffer], { shouldValidate: true })
    setOfferType("")
    setTempValues({})
  }

  const removeOffer = (id: string) => {
    form.setValue("offers", offers.filter((offer) => offer.id !== id), { shouldValidate: true })
  }

  return (
    <div>
      <ul className='flex flex-col border p-4 rounded-lg space-y-4'>
        {offers.map((offer) => (
          <li key={offer.id} className='flex items-center gap-4'>
            <span className='w-full border px-3 py-2 rounded-md'>{offer.description}</span>
            <Button
              variant={"destructive"}
              size={"icon"}
              onClick={() => removeOffer(offer.id)}
            >
              <X />
            </Button>
          </li>
        ))}

        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"outline"} className='flex-1 self-center'>Add New Offer</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Offer</DialogTitle>
              <DialogDescription>Create new offer for this product</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 border rounded-lg p-4">
              {/* Dropdown */}
              <Label htmlFor="offerType">Select Offer Type</Label>
              <Select value={offerType} onValueChange={(val: string) => setOfferType(val as OfferType | "")}>
                <SelectTrigger className="w-[250px]">
                  <SelectValue placeholder="Choose an offer type" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(OFFER_LABELS).map((key) => (
                    <SelectItem key={key} value={key}>
                      {OFFER_LABELS[key as OfferType]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Dynamic Inputs */}
              {offerType === "buy-get" && (
                <p className="text-sm text-gray-600">No extra input needed — applies automatically.</p>
              )}

              {offerType === "percentage-discount" && (
                <div className="space-y-2">
                  <Label>Discount Percentage</Label>
                  <Input
                    type="number"
                    placeholder="Enter percentage (e.g. 10)"
                    onChange={(e) => setTempValues({ ...tempValues, value: e.target.value })}
                  />
                </div>
              )}

              {offerType === "flat-amount-discount" && (
                <div className="space-y-2">
                  <Label>Discount Amount</Label>
                  <Input
                    type="number"
                    placeholder="Enter amount (e.g. 200)"
                    onChange={(e) => setTempValues({ ...tempValues, value: e.target.value })}
                  />
                </div>
              )}

              {offerType === "quantity-discount" && (
                <div className="space-y-2">
                  <Label>Buy Quantity</Label>
                  <Input
                    type="number"
                    placeholder="Enter quantity (e.g. 3)"
                    onChange={(e) => {
                      const newQty = e.target.value
                      setTempValues({
                        ...tempValues,
                        qty: newQty,
                        value: `Buy ${newQty} for ₹${tempValues.price || ""}`,
                      })
                    }}
                  />
                  <Label>Price for this quantity</Label>
                  <Input
                    type="number"
                    placeholder="Enter price (e.g. 500)"
                    onChange={(e) => {
                      const newPrice = e.target.value
                      setTempValues({
                        ...tempValues,
                        price: newPrice,
                        value: `Buy ₹{tempValues.qty || ""} for ₹${newPrice}`,
                      })
                    }}
                  />
                </div>
              )}

              {offerType === "limited-time-offer" && (
                <div className="space-y-2">
                  <Label>Discount Amount / Percentage</Label>
                  <Input
                    type="text"
                    placeholder="Enter value (e.g. 20% or ₹200)"
                    onChange={(e) => setTempValues({ ...tempValues, value: e.target.value })}
                  />
                  <Label>Offer Expiry Date</Label>
                  <Input
                    type="date"
                    onChange={(e) => setTempValues({ ...tempValues, expiry: e.target.value })}
                  />
                </div>
              )}

              {/* Add Button */}
              {offerType && (
                <Button type="button" className="mt-2" onClick={addOffer}>
                  Add Offer
                </Button>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </ul>
    </div>
  )
}

export default OfferDialog
