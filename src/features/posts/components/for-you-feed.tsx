"use client";

import { useGetPostFeeds } from "@/app/services/post";
import { Loader2 } from "lucide-react";
import Post from "./post";
import InfiniteScrollContainer from "@/components/infinite-scroll-container";

export default function ForYouFeed() {
  const {
    data,
    isPending,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useGetPostFeeds();

  if (isPending) {
    return <Loader2 className="mx-auto animate-spin" />;
  }

  if (error) {
    return (
      <p className="text-destructive text-center">
        An error occured while loading posts
      </p>
    );
  }

  const posts = data.pages.flatMap((page) => page.posts) || [];

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
