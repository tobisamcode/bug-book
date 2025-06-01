"use client";

import {
  useGetFollowingFeeds,
  useGetPostFeeds,
} from "@/features/posts/services/queries";
import { Loader2 } from "lucide-react";
import Post from "./post";
import InfiniteScrollContainer from "@/components/infinite-scroll-container";
import PostsLoadingSkeleton from "./loading-skeleton";
import DeletePostDialog from "./delete-post-dialog";

export default function FollowingFeed() {
  const {
    data,
    isSuccess,
    isPending,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useGetFollowingFeeds();

  const posts = data?.pages.flatMap((page) => page.posts) || [];

  if (isPending) {
    return <PostsLoadingSkeleton />;
  }

  if (isSuccess && !posts.length && !hasNextPage) {
    return (
      <p className="text-muted-foreground text-center">
        No posts found, start following some users to see their posts here.
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
