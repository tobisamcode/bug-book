import { useDeletePostMutation } from "@/app/services/post/mutations";
import LoadingButton from "@/components/loading-button";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { PostData } from "@/lib/types";

interface DeletePostDialogProps {
  post: PostData;
  isOpen: boolean;
  onClose: () => void;
}

export default function DeletePostDialog({
  post,
  isOpen,
  onClose,
}: DeletePostDialogProps) {
  const { mutate: deletePost, isPending } = useDeletePostMutation();

  function handleOpenChange(open: boolean) {
    if (!open && !isPending) {
      onClose();
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Post?</DialogTitle>

          <DialogDescription>
            Are you sure you want to delete this post? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <LoadingButton
            loading={isPending}
            className="bg-red-500 text-white hover:bg-red-400"
            onClick={() => deletePost(post.id, { onSuccess: onClose })}
          >
            Delete
          </LoadingButton>
          <Button variant="outline" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
