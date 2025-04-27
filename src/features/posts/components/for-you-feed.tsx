"use client";

import { useGetPostFeeds } from "@/app/services/post";
import { Loader2 } from "lucide-react";
import Post from "./post";
import InfiniteScrollContainer from "@/components/infinite-scroll-container";
import PostsLoadingSkeleton from "./loading-skeleton";

export default function ForYouFeed() {
  const {
    data,
    isSuccess,
    isPending,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useGetPostFeeds();

  const posts = data?.pages.flatMap((page) => page.posts) || [];

  if (isPending) {
    return <PostsLoadingSkeleton />;
  }

  if (isSuccess && !posts.length && !hasNextPage) {
    return (
      <p className="text-muted-foreground text-center">
        No one has posted yet.
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
