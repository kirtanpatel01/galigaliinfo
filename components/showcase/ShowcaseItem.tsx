import ProductOffers from './product-offers'
import ReviewBox from './review-box'
import ShowCaseInfo from './show-case-info'

function ShowcaseItem({ product }: { product: Product }) {
  return (
    <article className="w-full space-y-4 sm:space-y-6">
      <ShowCaseInfo product={product} />

      {/* Product Details */}
      <section
        className="border rounded-md w-full p-2 sm:p-4 space-y-2"
        aria-labelledby="details-heading"
      >
        <h2 className="font-semibold text-xl underline decoration-1 underline-offset-2" id="details-heading">
          Details:
        </h2>
        <p className="break-words">
          {product.description}
        </p>
      </section>

      <div className="w-full">
        <ProductOffers offers={product.offers} />
      </div>

      {/* Review Section */}
      <ReviewBox productId={product.id} owner={product.user_id} />
    </article>
  )
}

export default ShowcaseItem
