import { useState, useTransition } from "react"
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { MoreHorizontal, Star } from "lucide-react"
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
import { ShowcaseCardItem } from "@/types/product"

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

  console.log(shopPhoto)

  return (
    <>
      <Card
        className={`w-52 border border-border rounded-xl shadow-md hover:shadow-lg transition-all duration-200 ${type !== "business" ? "cursor-pointer" : ""
          }`}
      >
        <CardHeader className="p-4">
          {type === "business" && (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex-1 self-end cursor-pointer p-1 rounded-full hover:bg-muted transition-colors">
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
                  className="text-red-600 cursor-pointer hover:bg-red-50"
                  onClick={() => setOpenDialog(true)}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {image && type !== "self-pick-up" && (
            <img
              src={image}
              alt={title}
              height={200}
              width={200}
              className="h-28 w-full rounded-xl object-cover"
            />
          )}
          {shopPhoto && type === "self-pick-up" && (
            <img
              src={shopPhoto}
              alt={title}
              className="h-28 w-full rounded-xl object-cover"
              height={112}
              width={164}
            />
          )}
        </CardHeader>

        <CardContent className="flex justify-between items-center p-4 pt-0">
          <div>
            <CardTitle className="text-base font-semibold">{title}</CardTitle>
            <CardDescription className="line-clamp-1 text-muted-foreground">
              {shopName}
            </CardDescription>
          </div>
          {type === "product" && (
            <div className="border border-amber-300 bg-amber-100 rounded-md px-2 py-1 flex justify-center items-center gap-1 text-amber-700">
            <Star className="size-4" />
            <span className="text-sm font-medium">{rating?.toFixed(1)}</span>
          </div>)}
        </CardContent>

        <Separator className="bg-border hover:bg-foreground/20 transition-colors" />

        <CardFooter className="flex flex-col gap-4 pt-4 p-4">
          <span className="place-self-start text-sm text-muted-foreground">
            {address}
          </span>
          {type === "product" && timeAgo && (
            <span className="place-self-end text-xs italic text-muted-foreground">
              {timeAgo}
            </span>
          )}
        </CardFooter>
      </Card>

      {/* Alert dialog outside dropdown */}
      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent className="rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-semibold">
              Delete product?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove your
              product from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-md">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="rounded-md bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700"
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