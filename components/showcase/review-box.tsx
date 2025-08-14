import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Star, User2Icon } from 'lucide-react'
import { Separator } from '../ui/separator'

function ReviewBox() {
  return (
    <section
      className="border rounded-md w-full"
      aria-labelledby="reviews-heading"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 sm:gap-2 p-2 pl-4">
        <h2 className="font-semibold text-xl" id="reviews-heading">
          Reviews
        </h2>
        <Dialog>
          <DialogTrigger className="bg-accent rounded-md px-4 py-2">
            Add Review
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a new review</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="border rounded-md">
                <h3 className="font-medium tracking-wider p-2 bg-accent text-accent-foreground rounded-t-sm">
                  Ratings
                </h3>
                <Separator />
                <RadioGroup className="w-full flex flex-row flex-wrap justify-center items-center gap-4 sm:gap-8 py-4">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <div key={num} className="flex items-center gap-2">
                      <RadioGroupItem value={num.toString()} />
                      <Label>{num}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <Label className="pl-1">Review</Label>
                <Textarea
                  className="min-h-24"
                  placeholder="Enter your review here..."
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Separator />
      <ul className="p-2 sm:p-4 space-y-2 sm:space-y-4">
        <li>
          <article className="border rounded-2xl">
            <header className="p-2 flex items-center justify-between sm:justify-start gap-2 bg-accent rounded-t-2xl">
              <div className='flex items-center gap-1 sm:gap-2'>
                <User2Icon className="rounded-full bg-black size-8 p-1" />
                <h3 className="font-bold">Username</h3>
              </div>
              <div className="flex sm:justify-center items-center gap-1 border border-yellow-400/20 rounded-md px-1 sm:px-2 py-1 bg-yellow-400/15">
                <Star className="size-5 text-yellow-400" />
                <span>4.5</span>
              </div>
            </header>
            <Separator />
            <p className="px-4 py-2">Review content...</p>
          </article>
        </li>
      </ul>
    </section>
  )
}

export default ReviewBox