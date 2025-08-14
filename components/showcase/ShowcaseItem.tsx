import ReviewBox from './review-box'
import ShowCaseInfo from './show-case-info'

function ShowcaseItem({ id }: { id: string }) {
  console.log(id)
  return (
    <article className="w-full space-y-4 sm:space-y-6">
      <ShowCaseInfo />
      {/* Product Details */}
      <section
        className="border rounded-md w-full"
        aria-labelledby="details-heading"
      >
        <h2
          className="font-semibold text-xl p-2 sm:p-4"
          id="details-heading"
        >
          Details
        </h2>
        <p className="break-words p-2 sm:p-4">
          doinifvnrognvribtnpbntpcicemnoejksmwdhujiksoxndchjijfhdsnjiuebhdnskjwiedhbnjsierhyjskuehydnjsi
        </p>
      </section>

      {/* Review Section */}
      <ReviewBox />
    </article>

  )
}

export default ShowcaseItem