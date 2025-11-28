// components/product-form/product.schema.ts
import * as z from "zod";

export const offerTypes = [
  "buy-get",
  "percentage-discount",
  "flat-amount-discount",
  "quantity-discount",
  "limited-time-offer",
] as const;

export const offerSchema = z.object({
  id: z.string(),
  type: z.enum(offerTypes),
  description: z.string().min(1, "Offer description is required"),

  // optional numeric fields (nullable to match DB-level nullable if any)
  percentage: z.number().nullable().optional(),
  amount: z.number().nullable().optional(),
  qty: z.number().nullable().optional(),
  price: z.number().nullable().optional(),
  expiry: z.string().nullable().optional(),
});

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(5, "Description too short"),
  images: z.array(z.string()).min(1, "At least one image is required"),
  price: z.number().min(1),
  qty: z.number().min(1),
  qty_available: z.number(),
  qty_unit: z.string(),
  offers: z.array(offerSchema),
});

export type Offer = z.infer<typeof offerSchema>;
export type ProductFormValues = z.infer<typeof productSchema>;
