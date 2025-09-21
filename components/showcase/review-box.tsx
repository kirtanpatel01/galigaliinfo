"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogTrigger } from "../ui/dialog"
import { Separator } from "../ui/separator"
import { Star, User2Icon } from "lucide-react"
import { useProductReviews } from "@/hooks/use-product-reviews"
import { createClient } from "@/lib/supabase/client"
import LoadingSpinner from "../loading-spinner"
import AddReviewDialog from "../add-review-dialog"
import { motion, AnimatePresence } from "framer-motion"

function ReviewBox({ productId, owner }: { productId: number; owner: string }) {
  const { reviews = [], isLoading } = useProductReviews(productId)
  const supabase = createClient()
  const [user, setUser] = useState<string | null>(null)

  useEffect(() => {
    async function fetchUser() {
      const { data } = await supabase.auth.getUser()
      setUser(data.user?.id ?? null)
    }
    fetchUser()
  }, [supabase.auth])

  const isOwner = user === owner

  if (isLoading) return <LoadingSpinner />

  return (
    <motion.section
      className="border rounded-xl w-full shadow-sm"
      aria-labelledby="reviews-heading"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 p-4">
        <h2 className="font-semibold text-xl text-foreground" id="reviews-heading">
          Reviews
        </h2>
        <Dialog>
          {isOwner ? (
            <p className="text-sm text-muted-foreground italic">
              You cannot review your own product
            </p>
          ) : (
            <>
              <DialogTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-accent rounded-md px-4 py-2 text-accent-foreground hover:bg-accent/80 transition-colors"
                >
                  Add Review
                </motion.button>
              </DialogTrigger>
              <AddReviewDialog productId={productId} />
            </>
          )}
        </Dialog>
      </div>

      <Separator />

      {/* Reviews */}
      <AnimatePresence>
        {reviews.length === 0 ? (
          <motion.p
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-6 text-center text-muted-foreground"
          >
            No reviews yet. Be the first to share your thoughts! 🌟
          </motion.p>
        ) : (
          <motion.ul
            key="reviews"
            className="space-y-4 p-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.08 }
              }
            }}
          >
            {reviews.map((review: Review) => (
              <motion.li
                key={review.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
              >
                <article className="border rounded-2xl shadow-sm overflow-hidden">
                  <header className="p-3 flex items-center justify-between sm:justify-start gap-3 bg-accent/10 rounded-t-2xl">
                    <div className="flex items-center gap-2">
                      <User2Icon className="rounded-full bg-muted text-muted-foreground size-8 p-1" />
                      <h3 className="font-semibold">
                        {review.profile?.username ?? "Anonymous"}
                      </h3>
                    </div>
                    <div className="flex items-center gap-1 text-amber-700 font-medium">
                      <Star className="size-5" />
                      <span>{review.rating} / 5</span>
                    </div>
                  </header>
                  <Separator />
                  <p className="px-4 py-3 text-foreground">{review.content}</p>
                </article>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.section>
  )
}

export default ReviewBox
