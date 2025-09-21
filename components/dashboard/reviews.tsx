import { useReviews } from "@/hooks/dashboard/use-reviews";
import LoadingSpinner from "../loading-spinner";
function Reviews({ shopId }: { shopId: string }) {
  const { data: reviews, isLoading: reviewsLoading } = useReviews(shopId);
  return (
    <div className="p-4 bg-card text-card-foreground rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Recent Reviews</h2>
      {reviewsLoading ? (
        <LoadingSpinner />
      ) : reviews?.length ? (
        <ul>
          {reviews.map((r) => (
            <li key={r.id} className="border-b py-2">
              <p className="font-medium">{r.user} ⭐ {r.rating}</p>
              <p className="text-sm text-muted-foreground">{r.product}: {r.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-muted-foreground">No reviews yet</div>
      )}
    </div>
  )
}

export default Reviews