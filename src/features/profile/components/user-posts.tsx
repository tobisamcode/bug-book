"use client";

import {
  useGetPostFeeds,
  useGetUserPostFeeds,
} from "@/features/posts/services/queries";
import { Loader2 } from "lucide-react";
import InfiniteScrollContainer from "@/components/infinite-scroll-container";
import PostsLoadingSkeleton from "@/features/posts/components/loading-skeleton";
import Post from "@/features/posts/components/post";

interface UserPostsProps {
  userId: string;
}

export default function UserPosts({ userId }: UserPostsProps) {
  const {
    data,
    isSuccess,
    isPending,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useGetUserPostFeeds(userId);

  const posts = data?.pages.flatMap((page) => page.posts) || [];

  if (isPending) {
    return <PostsLoadingSkeleton />;
  }

  if (isSuccess && !posts.length && !hasNextPage) {
    return (
      <p className="text-muted-foreground text-center">
        This user has no posts yet.
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-destructive text-center">
        An error occured while loading posts
      </p>
    );
  }

  return (
    <InfiniteScrollContainer
      className="space-y-5"
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
    >
      {posts?.map((post) => <Post key={post.id} post={post} />)}
      {isFetchingNextPage && <Loader2 className="mx-auto my-3 animate-spin" />}
    </InfiniteScrollContainer>
  );
}
