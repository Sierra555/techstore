'use client';

import { useState, useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel } from "../ui/alert-dialog";

const DeleteDialog = ({ id, action }: {
  id: string;
  action: (id: string) => Promise<{success: boolean, message: string}>;
}) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleDeleteClick = () => {
    startTransition(async () => {
      const res = await action(id);

      toast({
          variant: res.success ? 'default' : 'destructive',
          description: res.message
      });
    })
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant='destructive'
          size='sm'
          className="ml-2"
        >
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>This action can&apos;t be undone</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant='destructive'
            size='sm'
            className="ml-2"
            onClick={handleDeleteClick}
            disabled={isPending}
          >{isPending ? 'Deleting...' : 'Delete'}</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;