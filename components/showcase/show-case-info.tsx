import { Star } from 'lucide-react'
import Image from 'next/image'
import { Separator } from '../ui/separator'

function ShowCaseInfo() {
  return (
    <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
      {/* Product Title */}
      <header className="space-y-2 sm:space-y-4 border rounded-md p-2 sm:p-4 w-full lg:w-[300px]">
        <h1 className="text-2xl font-bold">Product Name</h1>
        <Image
          src="/khaman.webp"
          alt="khaman"
          height={200}
          width={300}
          className="rounded-md w-full h-auto object-cover"
        />
      </header>

      {/* Shop Details */}
      <div className="flex flex-col gap-4 sm:gap-6 w-full">
        <section
          className="w-full flex justify-between items-center border rounded-md p-2 sm:p-4 gap-4 sm:gap-4"
          aria-labelledby="shop-heading"
        >
          <div className="space-y-1">
            <h2 className="font-bold">Shop Name</h2>
            <address className="not-italic text-muted-foreground text-sm">
              Shop Address
            </address>
          </div>
          <div className="border border-yellow-500/30 bg-yellow-300/10 rounded-md p-1 sm:p-2 flex justify-center items-center gap-1">
            <Star className="size-5 text-yellow-400" />
            <span>4.3</span>
          </div>
        </section>

        {/* Contact Details */}
        <section
          className="border rounded-md w-full"
          aria-labelledby="contact-heading"
        >
          <h2
            className="font-semibold text-xl p-2 sm:p-4"
            id="contact-heading"
          >
            Contact & Availability
          </h2>
          <Separator />
          <div className="flex flex-col xl:flex-row gap-2 sm:gap-4 p-2 sm:p-4">
            <dl className="flex-1 divide-y rounded-md border text-sm overflow-hidden">
              <div className="grid grid-cols-[max-content_1fr] gap-x-2 sm:gap-x-4 p-2 sm:p-4">
                <dt className="text-muted-foreground font-medium">
                  Availability:
                </dt>
                <dd className="font-semibold">Monday to Friday</dd>
              </div>
              <div className="grid grid-cols-[max-content_1fr] gap-x-2 sm:gap-x-4 p-2 sm:p-4">
                <dt className="text-muted-foreground font-medium">
                  Contact No.:
                </dt>
                <dd className="font-semibold">+91 2423234056</dd>
              </div>
              <div className="grid grid-cols-[max-content_1fr] gap-x-2 sm:gap-x-4 p-2 sm:p-4">
                <dt className="text-muted-foreground font-medium">Address:</dt>
                <dd className="italic">
                  Opp. Param Hospital, Sankarda, Vadodara, Gujarat-391350
                </dd>
              </div>
            </dl>
            <div className="flex-1 min-h-[200px] flex justify-center items-center border rounded-md">
              MAP
            </div>
          </div>
        </section>
      </div>
    </div>

  )
}

export default ShowCaseInfo