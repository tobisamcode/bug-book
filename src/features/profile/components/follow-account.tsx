"use client";

import { useFollowerQuery } from "@/features/follow-users/services/queries";
import { FollowerInfo } from "@/lib/types";
import { formatNumber } from "@/lib/utils";

interface FollowAccountProps {
  userId: string;
  initialState: FollowerInfo;
}

export default function FollowAccount({
  userId,
  initialState,
}: FollowAccountProps) {
  const { data, isSuccess, isPending, error } = useFollowerQuery(
    userId,
    initialState,
  );

  return (
    <span>
      Followers:{" "}
      <span className="font-semibold">
        {formatNumber(data?.followers || 0)}
      </span>
    </span>
  );
}
