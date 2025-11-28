import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { toast } from "sonner";
import { cancelOrder } from "@/actions/order.actions";
import { Button } from "./ui/button";

function DialogCloseBtn({ id, status }: { id: number; status: string }) {
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    try {
      await cancelOrder(id);
      console.log(id);
      toast.success("Order canceled.");
      setOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Error while canceling the order!");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild className="">
        <Button
          variant={"destructive"}
          className={`w-fit ${
            status === "pending" ? "cursor-pointer" : "cursor-not-allowed"
          }`}
          disabled={status !== "pending"}
        >
          Cancle
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action can&apos;t be undone. This will permanently remove your
            order request!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/85"
            onClick={handleSubmit}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DialogCloseBtn;
