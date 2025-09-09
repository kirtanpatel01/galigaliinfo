import { useState, useTransition } from "react"
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { MoreHorizontal, Star } from "lucide-react"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "../ui/dropdown-menu"
import Link from "next/link"
import { deleteProductAction, toggleProductHiddenAction } from "@/actions/product.actions"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "../ui/alert-dialog"

type ShowcaseCardProps = ShowcaseCardItem & {
  type: "shop" | "product" | "self-pick-up" | "business"
}

function ShowcaseCard({
  id,
  type,
  image,
  title,
  shopName,
  rating,
  address,
  timeAgo,
  shopPhoto,
  isHidden,
}: ShowcaseCardProps) {
  const [isPending, startTransition] = useTransition()
  const [openDialog, setOpenDialog] = useState(false)

  // Early return AFTER hooks are defined
  if (isHidden && type !== "business") return null

  return (
    <>
      <Card
        className={`w-52 ${
          type !== "business"
            ? "cursor-pointer hover:border-slate-600/50 hover:bg-slate-500/5 hover:shadow-slate-600/20 "
            : ""
        }`}
      >
        <CardHeader className="p-4">
          {type === "business" && (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex-1 self-end cursor-pointer p-1 rounded-full hover:bg-accent">
                <MoreHorizontal />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  disabled={isPending}
                  onClick={() =>
                    startTransition(() =>
                      toggleProductHiddenAction(id, !isHidden)
                    )
                  }
                >
                  {isHidden ? "Unhide" : "Hide"}
                </DropdownMenuItem>
                <Link href={`/business/listings/edit/${id}`}>
                  <DropdownMenuItem className="cursor-pointer">
                    Edit
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem
                  className="text-destructive cursor-pointer"
                  onClick={() => setOpenDialog(true)}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          {image && type !== "self-pick-up" && (
            <Image
              src={image}
              alt={title}
              height={200}
              width={200}
              className="h-28 w-full rounded-lg object-cover"
            />
          )}
          {shopPhoto && type === "self-pick-up" && (
            <Image
              src={shopPhoto}
              alt={title}
              className="h-28 w-full rounded-lg object-cover"
              height={112}
              width={164}
            />
          )}
        </CardHeader>

        <CardContent className="flex justify-between items-center p-4 pt-0">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription className="line-clamp-1">
              {shopName}
            </CardDescription>
          </div>
          <div className="border border-amber-500/20 bg-amber-200/10 rounded-md px-2 py-1 flex justify-center items-center gap-1">
            <Star className="text-amber-300 size-4" />
            <span>{rating}</span>
          </div>
        </CardContent>

        <Separator className="hover:bg-slate-600/50" />

        <CardFooter className="flex flex-col gap-4 pt-4 p-4">
          <span className="place-self-start text-sm">{address}</span>
          {type === "product" && timeAgo && (
            <span className="place-self-end text-opacity-50 text-xs">
              {timeAgo}
            </span>
          )}
        </CardFooter>
      </Card>

      {/* Alert dialog outside dropdown */}
      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete product?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove your
              product from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-white hover:bg-destructive/90"
              disabled={isPending}
              onClick={() =>
                startTransition(async () => {
                  await deleteProductAction(id)
                  setOpenDialog(false)
                })
              }
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
 export default ShowcaseCard