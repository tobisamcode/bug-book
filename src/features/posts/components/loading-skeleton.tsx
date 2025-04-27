import { Skeleton } from "@/components/ui/skeleton";

export default function PostsLoadingSkeleton() {
  return (
    <div className="space-y-5">
      <PostloadingSkeleton />
      <PostloadingSkeleton />
      <PostloadingSkeleton />
      <PostloadingSkeleton />
    </div>
  );
}

function PostloadingSkeleton() {
  return (
    <div className="bg-card w-full animate-pulse space-y-3 rounded-2xl p-5 shadow-sm">
      <div className="flex flex-wrap gap-3">
        <Skeleton className="size-10 rounded-full" />
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-24 rounded" />
          <Skeleton className="h-3 w-24 rounded" />
        </div>
      </div>

      <Skeleton className="h-16 rounded" />
    </div>
  );
}
