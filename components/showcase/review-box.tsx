"use client"

import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../ui/dialog"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { Separator } from "../ui/separator"
import { Star, User2Icon } from "lucide-react"
import { useProductReviews } from "@/hooks/use-product-reviews"
import { Button } from "../ui/button"
import { createClient } from "@/lib/supabase/client"

function ReviewBox({ productId, owner }: { productId: number, owner: string }) {
  const { reviews = [], isLoading, addReviewMutation } = useProductReviews(productId)
  const supabase = createClient()

  const [user, setUser] = useState<string | null>(null);
  const [rating, setRating] = useState(0)
  const [content, setContent] = useState("")

  useEffect(() => {
    async function fetchUser() {
      const { data } = await supabase.auth.getUser();
      setUser(data.user?.id ?? null);
    }
    fetchUser();
  }, [supabase.auth]);

  const isOwner = user === owner;
  console.log(isOwner)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    addReviewMutation.mutate({ rating, content })
    setRating(0)
    setContent("")
  }

  return (
    <section className="border rounded-md w-full" aria-labelledby="reviews-heading">
      {/* Header + Dialog */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 sm:gap-2 p-2 pl-4">
        <h2 className="font-semibold text-xl" id="reviews-heading">
          Reviews
        </h2>
        <Dialog>
          {isOwner ? (
            <p className="text-sm text-muted-foreground mt-1">
              You cannot review your own product
            </p>
          ) : (
            <DialogTrigger
              className="bg-accent rounded-md px-4 py-2"
              disabled={!!isOwner}
            >
              Add Review
            </DialogTrigger>
          )}
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a new review</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Ratings */}
              <div className="border rounded-md">
                <h3 className="font-medium tracking-wider p-2 bg-accent text-accent-foreground rounded-t-sm">
                  Ratings
                </h3>
                <Separator />
                <RadioGroup
                  className="w-full flex flex-row flex-wrap justify-center items-center gap-4 sm:gap-8 py-4"
                  onValueChange={(val) => setRating(Number(val))}
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <div key={num} className="flex items-center gap-2">
                      <RadioGroupItem value={num.toString()} />
                      <Label>{num}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Review Text */}
              <div>
                <Label className="pl-1">Review</Label>
                <Textarea
                  className="min-h-24"
                  placeholder="Enter your review here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              <Button
                type="submit"
                disabled={addReviewMutation.isPending}
                className="w-full"
              >
                {addReviewMutation.isPending ? "Submitting..." : "Submit Review"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Separator />

      {!isLoading && (
        <>
          {reviews.length === 0 ? (
            <p className="p-4 text-center text-muted-foreground">
              No reviews yet. Be the first to leave a review!
            </p>
          ) : (
            <ul className="space-y-4 p-2">
              {reviews.map((review: Review) => (
                <li key={review.id}>
                  <article className="border rounded-2xl">
                    <header className="p-2 flex items-center justify-between sm:justify-start gap-2 bg-accent rounded-t-2xl">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <User2Icon className="rounded-full bg-black size-8 p-1" />
                        <h3 className="font-bold">
                          {review.profile?.username ?? "Anonymous"}
                        </h3>
                      </div>
                      <div className="flex sm:justify-center items-center gap-1 border border-yellow-400/20 rounded-md px-1 sm:px-2 py-1 bg-yellow-400/15">
                        <Star className="size-5 text-yellow-400" />
                        <span>{review.rating ?? 0}</span>
                      </div>
                    </header>
                    <Separator />
                    <p className="px-4 py-2">{review.content}</p>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  )
}

export default ReviewBox
