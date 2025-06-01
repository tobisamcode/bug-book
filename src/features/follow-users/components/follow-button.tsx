"use client";

import { FollowerInfo } from "@/lib/types";
import { useFollowerQuery } from "../services/queries";
import { Button } from "@/components/ui/button";
import { useFollowMutation } from "../services/mutations";

interface FollowButtonProps {
  userId: string;
  initialState: FollowerInfo;
}

export default function FollowButton({
  userId,
  initialState,
}: FollowButtonProps) {
  const { data, isSuccess, isPending, error } = useFollowerQuery(
    userId,
    initialState,
  );

  const { mutate } = useFollowMutation(data, userId);

  return (
    <>
      <Button
        variant={data.isFllowedByMe ? "secondary" : "default"}
        onClick={() => mutate()}
      >
        {data.isFllowedByMe ? "Unfollow" : "Follow"}
      </Button>
    </>
  );
}
