"use client"

import { useState } from "react"
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useProductReviews } from "@/hooks/use-product-reviews"
import { Star } from "lucide-react"
import { motion } from "framer-motion"

interface AddReviewDialogProps {
  productId: number
}

export default function AddReviewDialog({ productId }: AddReviewDialogProps) {
  const { addReviewMutation } = useProductReviews(productId)
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [content, setContent] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addReviewMutation.mutate({ rating, content })
    setContent("")
    setRating(0)
  }

  return (
    <DialogContent>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="space-y-5"
      >
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Add a Review
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* ⭐ Rating */}
          <div className="space-y-2">
            <Label>Rating</Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`size-7 transition-colors ${
                      (hover || rating) >= star
                        ? "text-amber-500 fill-amber-500"
                        : "text-muted-foreground"
                    }`}
                  />
                </motion.button>
              ))}
            </div>
          </div>

          {/* 📝 Review content */}
          <div className="space-y-2">
            <Label htmlFor="content">Your Review</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your thoughts about this product..."
              required
            />
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={addReviewMutation.isPending || rating === 0}
              className="w-full"
            >
              {addReviewMutation.isPending ? "Submitting..." : "Submit Review"}
            </Button>
          </DialogFooter>
        </form>
      </motion.div>
    </DialogContent>
  )
}
