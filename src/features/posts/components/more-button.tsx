import { PostData } from "@/lib/types";

import { useState } from "react";
import DeletePostDialog from "./delete-post-dialog";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MoreButtonProps {
  post: PostData;
  className?: string;
}

export default function MoreButton({ post, className }: MoreButtonProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost" className={className}>
            <MoreHorizontal className="text-muted-foreground size-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setShowDeleteDialog(true)}>
            <span className="text-destructive flex items-center gap-3">
              <Trash2 className="text-destructive size-4" /> Delete
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeletePostDialog
        post={post}
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
      />
    </>
  );
}
