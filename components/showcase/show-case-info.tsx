// ShowCaseInfo.tsx
import { Separator } from '../ui/separator'
import ProductImageGallery from './product-image-gallery'

function ShowCaseInfo({ product, profile }: { product?: Product, profile?: Profile }) {
  return (
    <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
      {/* Product Title */}        
      {product && <ProductImageGallery images={product?.images || []} name={product?.name || ""} />}

      {/* Shop Details */}
      <div className="flex flex-col gap-4 sm:gap-6 w-full">
        <section className="w-full flex justify-between items-center border rounded-md p-2 sm:p-4 gap-4 sm:gap-4">
          <div className="space-y-1">
            <h2 className="font-bold">{product?.profile?.shopName || profile?.shopName}</h2>
            <address className="not-italic text-muted-foreground text-sm">
              {product?.profile?.fullName || profile?.fullName}
            </address>
          </div>
          {/* <div className="border border-yellow-500/30 bg-yellow-300/10 rounded-md p-1 sm:p-2 flex justify-center items-center gap-1">
            <Star className="size-5 text-yellow-400" />
            <span>4.3</span>
          </div> */}
        </section>

        {/* Contact Details */}
        <section className="border rounded-md w-full">
          <h2 className="font-semibold text-xl p-2 sm:p-4">Contact & Availability</h2>
          <Separator />
          <div className="flex flex-col gap-2 sm:gap-4 p-2 sm:p-4">
            <dl className="flex-1 divide-y rounded-md border text-sm overflow-hidden">
              <div className="grid grid-cols-[max-content_1fr] gap-x-2 sm:gap-x-4 p-2 sm:p-4">
                <dt className="text-muted-foreground font-medium">Contact No.:</dt>
                <dd className="font-semibold">{product?.profile?.phone || profile?.phone}</dd>
              </div>
              <div className="grid grid-cols-[max-content_1fr] gap-x-2 sm:gap-x-4 p-2 sm:p-4">
                <dt className="text-muted-foreground font-medium">Address:</dt>
                <dd className="italic">{product?.profile?.address || profile?.address}, {product?.profile?.city || profile?.city}, {product?.profile?.state || profile?.state}, {product?.profile?.country || profile?.country} - {product?.profile?.pincode || profile?.pincode}</dd>
              </div>
            </dl>
            <div className="flex-1 min-h-[200px] flex justify-center items-center border rounded-md overflow-hidden">
              {product?.profile?.address || profile?.address ? (
                <iframe
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    `${product?.profile?.address || profile?.address}, ${product?.profile?.city || profile?.city}, ${product?.profile?.state || profile?.state}, ${product?.profile?.country || profile?.country} - ${product?.profile?.pincode || profile?.pincode}`
                  )}&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <span className="text-muted-foreground">Location not available</span>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default ShowCaseInfo
