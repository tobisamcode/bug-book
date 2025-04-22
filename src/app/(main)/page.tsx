import TrendSidebar from "@/components/trend-sidebar";
import ForYouFeed from "@/features/posts/components/for-you-feed";
import PostEditor from "@/features/posts/components/post-editor";

export default function Home() {
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />
        <ForYouFeed />
      </div>
      <TrendSidebar />
    </main>
  );
}
