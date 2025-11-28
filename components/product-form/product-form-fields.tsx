"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProductFormValues } from "./product.schema";
import { Control } from "react-hook-form";

type Props = {
  control: Control<ProductFormValues>;
};

const fields: {
  name: keyof ProductFormValues;
  label: string;
  placeholder: string;
  type?: string;
  textarea?: boolean;
}[] = [
  { name: "name", label: "Product Name", placeholder: "Enter product name" },
  {
    name: "description",
    label: "Description",
    placeholder: "Enter product details...",
    textarea: true,
  },
  {
    name: "price",
    label: "Price",
    placeholder: "Enter product price",
    type: "number",
  },
  {
    name: "qty",
    label: "Quantity (per price)",
    placeholder: "Enter the quantity for above price",
    type: "number",
  },
  {
    name: "qty_unit",
    label: "Quantity Unit",
    placeholder: "Enter product quantity unit",
  },
  {
    name: "qty_available",
    label: "Available Quantity",
    placeholder: "Enter the available quantity in your shop",
    type: "number",
  },
];

export default function ProductFormFields({ control }: Props) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {fields.map(({ name, label, placeholder, type, textarea }) => (
        <FormField
          key={name}
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="font-medium">{label}</FormLabel>
              <FormControl>
                {textarea ? (
                  <Textarea
                    {...field}
                    placeholder={placeholder}
                    value={typeof field.value === "string" ? field.value : ""}
                    className="resize-none rounded-xl border border-border focus:border-blue-500 focus:ring-blue-500"
                    rows={4}
                  />
                ) : (
                  <Input
                    {...field}
                    type={type ?? "text"}
                    placeholder={placeholder}
                    value={
                      typeof field.value === "string" ||
                      typeof field.value === "number"
                        ? field.value
                        : ""
                    }
                    onChange={(e) => {
                      const val = e.target.value;
                      field.onChange(
                        type === "number"
                          ? val === ""
                            ? undefined
                            : Number(val)
                          : val
                      );
                    }}
                    className="rounded-xl border-border focus:border-blue-500 focus:ring-blue-500"
                  />
                )}
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
      ))}
    </div>
  );
}
