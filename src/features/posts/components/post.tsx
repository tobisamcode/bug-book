"use client";

import { useSession } from "@/app/(main)/session-provider";
import UserAvatar from "@/components/user-avatar";
import { PostData } from "@/lib/types";
import { formatRelativeDate } from "@/lib/utils";
import Link from "next/link";
import MoreButton from "./more-button";

interface PostProps {
  post: PostData;
}

export default function Post({ post }: PostProps) {
  const { user } = useSession();

  return (
    <article className="group/post bg-card space-y-3 rounded-2xl p-5 shadow-sm">
      <div className="flex justify-between">
        <div className="flex flex-wrap gap-3">
          <Link href={`/users/${post.user.username}`}>
            <UserAvatar avatarUrl={post.user.avatarUrl} className="h-10 w-10" />
          </Link>

          <div className="">
            <Link
              href={`/users/${post.user.username}`}
              className="block font-medium hover:underline"
            >
              {post.user.displayName}
            </Link>
            <Link
              href={`/posts/${post.id}`}
              className="text-muted-foreground block text-sm hover:underline"
            >
              {formatRelativeDate(post.createdAt)}
            </Link>
          </div>
        </div>

        {post.user.id === user?.id && (
          <MoreButton
            post={post}
            className="opacity-0 transition-opacity group-hover/post:opacity-100"
          />
        )}
      </div>

      <div className="break-words whitespace-pre-line">{post.content}</div>
    </article>
  );
}
