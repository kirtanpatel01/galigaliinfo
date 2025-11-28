"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import type { UseFormReturn } from "react-hook-form";
import { v4 as uuid } from "uuid";
import type {
  Offer as OfferSchema,
  ProductFormValues,
} from "@/components/product-form/product.schema";
import { generateDescFromOffer } from "@/lib/utils";
import { OfferType } from "@/types/product";

type TempValues = {
  percentage?: number | null;
  amount?: number | null;
  qty?: number | null;
  price?: number | null;
  expiry?: string | null;
};

const OFFER_LABELS: Record<OfferType, string> = {
  "buy-get": "Buy one get one free",
  "percentage-discount": "Percentage Discount",
  "flat-amount-discount": "Flat Amount Discount",
  "quantity-discount": "Quantity Discount",
  "limited-time-offer": "Limited-Time Offer",
};

function OfferDialog({ form }: { form: UseFormReturn<ProductFormValues> }) {
  const offers = (form.watch("offers") || []) as OfferSchema[];
  const [offerType, setOfferType] = useState<OfferType | "">("");
  const [tempValues, setTempValues] = useState<TempValues>({});

  const addOffer = () => {
    if (!offerType) return;

    // Field validation:
    if (
      (offerType === "percentage-discount" && !tempValues.percentage) ||
      (offerType === "flat-amount-discount" && !tempValues.amount) ||
      (offerType === "quantity-discount" &&
        (!tempValues.qty || !tempValues.price)) ||
      (offerType === "limited-time-offer" &&
        (!tempValues.expiry ||
          (!tempValues.amount && !tempValues.percentage)))
    ) {
      alert("Please fill all required fields for this offer type.");
      return;
    }

    // Prepare offer object matching new generateDescFromOffer signature
    const offerObj = {
      type: offerType,
      percentage:
        offerType === "percentage-discount" ? tempValues.percentage ?? null : null,
      amount:
        offerType === "flat-amount-discount" || offerType === "limited-time-offer"
          ? tempValues.amount ?? null
          : null,
      qty: offerType === "quantity-discount" ? tempValues.qty ?? null : null,
      price: offerType === "quantity-discount" ? tempValues.price ?? null : null,
      expiry: offerType === "limited-time-offer" ? tempValues.expiry ?? null : null,
    };

    const newOffer: OfferSchema = {
      id: uuid(),
      ...offerObj,
      description: generateDescFromOffer(offerObj),
    };

    form.setValue("offers", [...offers, newOffer], { shouldValidate: true });
    setOfferType("");
    setTempValues({});
  };

  const removeOffer = (id: string) => {
    form.setValue(
      "offers",
      offers.filter((offer) => offer.id !== id),
      { shouldValidate: true }
    );
  };

  return (
    <div>
      <ul className="flex flex-col border p-4 rounded-lg space-y-4">
        {offers.map((offer) => (
          <li key={offer.id} className="flex items-center gap-4">
            <span className="w-full border px-3 py-2 rounded-md">
              {offer.description}
            </span>
            <Button variant={"destructive"} size={"icon"} onClick={() => removeOffer(offer.id)}>
              <X />
            </Button>
          </li>
        ))}

        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"outline"} className="flex-1 self-center">
              Add New Offer
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Offer</DialogTitle>
              <DialogDescription>
                Create a new offer for this product
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 border rounded-lg p-4">
              {/* Offer Type Selector */}
              <Label>Select Offer Type</Label>
              <Select
                value={offerType}
                onValueChange={(val: string) => {
                  setOfferType(val as OfferType);
                  setTempValues({});
                }}
              >
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
                <p className="text-sm text-muted-foreground">
                  No additional fields required.
                </p>
              )}

              {offerType === "percentage-discount" && (
                <div className="space-y-2">
                  <Label>Discount Percentage</Label>
                  <Input
                    type="number"
                    placeholder="e.g. 10"
                    onChange={(e) =>
                      setTempValues({
                        ...tempValues,
                        percentage: Number(e.target.value),
                      })
                    }
                  />
                </div>
              )}

              {offerType === "flat-amount-discount" && (
                <div className="space-y-2">
                  <Label>Discount Amount (₹)</Label>
                  <Input
                    type="number"
                    placeholder="e.g. 200"
                    onChange={(e) =>
                      setTempValues({
                        ...tempValues,
                        amount: Number(e.target.value),
                      })
                    }
                  />
                </div>
              )}

              {offerType === "quantity-discount" && (
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label>Quantity</Label>
                    <Input
                      type="number"
                      placeholder="e.g. 5"
                      onChange={(e) =>
                        setTempValues({
                          ...tempValues,
                          qty: Number(e.target.value),
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Price for bundle (₹)</Label>
                    <Input
                      type="number"
                      placeholder="e.g. 500"
                      onChange={(e) =>
                        setTempValues({
                          ...tempValues,
                          price: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>
              )}

              {offerType === "limited-time-offer" && (
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label>Discount Amount (₹) [optional]</Label>
                    <Input
                      type="number"
                      placeholder="e.g. 100"
                      onChange={(e) =>
                        setTempValues({
                          ...tempValues,
                          amount: Number(e.target.value),
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Discount Percentage [%] [optional]</Label>
                    <Input
                      type="number"
                      placeholder="e.g. 20"
                      onChange={(e) =>
                        setTempValues({
                          ...tempValues,
                          percentage: Number(e.target.value),
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Expiry Date</Label>
                    <Input
                      type="date"
                      onChange={(e) =>
                        setTempValues({
                          ...tempValues,
                          expiry: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              )}

              {/* Add Offer Button */}
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
  );
}

export default OfferDialog;
