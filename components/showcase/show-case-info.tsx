// ShowCaseInfo.tsx
import { Product, Profile } from '@/types/product'
import { Separator } from '../ui/separator'
import ProductImageGallery from './product-image-gallery'

function ShowCaseInfo({ product, profile }: { product?: Product, profile?: Profile }) {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {product && (
        <ProductImageGallery
          images={product?.images || []}
          name={product?.name || ""}
        />
      )}

      <div className="flex flex-col gap-6 w-full">
        {/* Shop Details */}
        <section className="w-full flex justify-between items-center border rounded-xl p-4 shadow-sm">
          <div className="space-y-1">
            <h2 className="font-bold text-lg">
              {product?.profile?.shopName || profile?.shopName}
            </h2>
            <address className="not-italic text-muted-foreground text-sm">
              {product?.profile?.fullName || profile?.fullName}
            </address>
          </div>
        </section>

        {/* Contact Details */}
        <section className="border rounded-xl w-full shadow-sm">
          <h2 className="font-semibold text-xl p-4 bg-accent/10 text-foreground rounded-t-xl">
            Contact & Availability
          </h2>
          <Separator />
          <div className="flex flex-col gap-4 p-4">
            <dl className="flex-1 divide-y rounded-md border text-sm overflow-hidden">
              <div className="grid grid-cols-[max-content_1fr] gap-x-4 p-4">
                <dt className="text-muted-foreground font-medium">
                  Contact No.:
                </dt>
                <dd className="font-semibold">
                  {product?.profile?.phone || profile?.phone}
                </dd>
              </div>
              <div className="grid grid-cols-[max-content_1fr] gap-x-4 p-4">
                <dt className="text-muted-foreground font-medium">Address:</dt>
                <dd className="italic">
                  {product?.profile?.address || profile?.address},{" "}
                  {product?.profile?.city || profile?.city},{" "}
                  {product?.profile?.state || profile?.state},{" "}
                  {product?.profile?.country || profile?.country} -{" "}
                  {product?.profile?.pincode || profile?.pincode}
                </dd>
              </div>
            </dl>
            <div className="flex-1 min-h-[200px] flex justify-center items-center border rounded-xl overflow-hidden">
              {product?.profile?.address || profile?.address ? (
                <iframe
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    `${product?.profile?.address || profile?.address}, ${
                      product?.profile?.city || profile?.city
                    }, ${product?.profile?.state || profile?.state}, ${
                      product?.profile?.country || profile?.country
                    } - ${product?.profile?.pincode || profile?.pincode}`
                  )}&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <span className="text-muted-foreground">
                  Location not available
                </span>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default ShowCaseInfo
