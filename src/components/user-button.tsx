"use client";

import { useSession } from "@/app/(main)/session-provider";
import { DropdownMenu } from "./ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import UserAvatar from "./user-avatar";

interface UserButtonProps {
  className?: string;
}

export default function UserButton({ className }: UserButtonProps) {
  const { user } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="">
          <UserAvatar
            avatarUrl={user?.avatarUrl}
            size={40}
            className={className}
          />
        </button>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
}
