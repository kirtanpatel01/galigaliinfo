import ProductOffers from './product-offers'
import ReviewBox from './review-box'
import ShowCaseInfo from './show-case-info'

function ShowcaseItem({ product }: { product: Product }) {
  return (
    <article className="w-full space-y-6">
      <ShowCaseInfo product={product} />

      {/* Product Details */}
      <section
        className="border rounded-xl w-full p-4 space-y-3 shadow-sm"
        aria-labelledby="details-heading"
      >
        <h2
          className="font-semibold text-xl tracking-wide text-foreground"
          id="details-heading"
        >
          Details
        </h2>
        <p className="break-words text-muted-foreground">
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
