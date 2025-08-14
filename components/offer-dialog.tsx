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

const offers = [
  {
    id: 1,
    desc: " Buy one get one free",
  },
  {
    id: 2,
    desc: "20% discount on more than 2000rs order",
  },
  {
    id: 3,
    desc: "200rs cashback on more than 1000rs order",
  },
  {
    id: 4,
    desc: "50% sale on product which cost more than 3000rs",
  },
]

function OfferDialog() {
  const [offerType, setOfferType] = useState("")

  return (
    <div>
      <ul className='flex flex-col border p-4 rounded-lg space-y-4'>
        {offers.map((offer) => (
          <li key={offer.id} className='flex items-center gap-4'>
            <span className='w-full border px-3 py-2 rounded-md'>{offer.desc}</span>
            <Button variant={"destructive"} size={"icon"}><X /></Button>
          </li>
        ))}
        <Dialog>
          <DialogTrigger asChild>
            <Button className='flex-1 self-center'>Add New Offer</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Offer</DialogTitle>
              <DialogDescription>Create new offer for this product</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 border rounded-lg p-4">
              {/* Dropdown */}
              <Label htmlFor="offerType">Select Offer Type</Label>
              <Select value={offerType} onValueChange={setOfferType}>
                <SelectTrigger className="w-[250px]">
                  <SelectValue placeholder="Choose an offer type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="buy-get">Buy one get one free</SelectItem>
                  <SelectItem value="percentage-discount">Percentage Discount</SelectItem>
                  <SelectItem value="flat-amount-discount">Flat Amount Discount</SelectItem>
                  <SelectItem value="quantity-discount">Quantity Discount</SelectItem>
                  <SelectItem value="limited-time-offer">Limited-Time Offer</SelectItem>
                </SelectContent>
              </Select>

              {/* Dynamic Inputs */}
              {offerType === "buy-get" && (
                <p className="text-sm text-gray-600">No extra input needed — applies automatically.</p>
              )}

              {offerType === "percentage-discount" && (
                <div className="space-y-2">
                  <Label>Discount Percentage</Label>
                  <Input type="number" placeholder="Enter percentage (e.g. 10)" />
                </div>
              )}

              {offerType === "flat-amount-discount" && (
                <div className="space-y-2">
                  <Label>Discount Amount</Label>
                  <Input type="number" placeholder="Enter amount (e.g. 200)" />
                </div>
              )}

              {offerType === "quantity-discount" && (
                <div className="space-y-2">
                  <Label>Buy Quantity</Label>
                  <Input type="number" placeholder="Enter quantity (e.g. 3)" />
                  <Label>Price for this quantity</Label>
                  <Input type="number" placeholder="Enter price (e.g. 500)" />
                </div>
              )}

              {offerType === "limited-time-offer" && (
                <div className="space-y-2">
                  <Label>Discount Amount / Percentage</Label>
                  <Input type="text" placeholder="Enter value (e.g. 20% or ₹200)" />
                  <Label>Offer Expiry Date</Label>
                  <Input type="date" />
                </div>
              )}

              {/* Add Button */}
              {offerType && (
                <Button type="button" className="mt-2">
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