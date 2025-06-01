import { validateRequest } from "@/auth";
import TrendSidebar from "@/components/trend-sidebar";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/user-avatar";
import FollowButton from "@/features/follow-users/components/follow-button";
import FollowAccount from "@/features/profile/components/follow-account";
import UserPosts from "@/features/profile/components/user-posts";
import prisma from "@/lib/prisma";
import { FollowerInfo, generateDataSelect, UserData } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import { formatDate } from "date-fns";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

interface Props {
  params: {
    username: string;
  };
}

const getUser = cache(async (username: string, loggedInUserId: string) => {
  const user = await prisma.user.findFirst({
    where: {
      username: {
        equals: username,
        mode: "insensitive",
      },
    },
    select: generateDataSelect(loggedInUserId),
  });

  if (!user) return notFound();

  return user;
});

export async function generateMetadata({
  params: { username },
}: Props): Promise<Metadata> {
  const { user: loggedInUser } = await validateRequest();

  if (!loggedInUser) return {};

  const user = await getUser(username, loggedInUser.id);

  return {
    title: `${user.displayName} (@${user.username})`,
    description: user.displayName,
  };
}

export default async function Page({ params: { username } }: Props) {
  const { user: loggedInUser } = await validateRequest();

  if (!loggedInUser)
    return <p className="text-destructive">You&apos;re not logged in</p>;

  const user = await getUser(username, loggedInUser.id);

  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <UserProfile user={user} loggedInUser={loggedInUser.id} />
        <div className="bg-card rounded-2xl p-5 shadow-sm">
          <h2 className="text-center text-2xl font-bold">
            {user.displayName}&apos;s posts
          </h2>
        </div>
        <UserPosts userId={user.id} />
      </div>
      <TrendSidebar />
    </main>
  );
}

interface UserProfileProps {
  user: UserData;
  loggedInUser: string;
}

async function UserProfile({ user, loggedInUser }: UserProfileProps) {
  const followerInfo: FollowerInfo = {
    followers: user._count.followers,
    isFllowedByMe: user.followers.some(
      ({ followerId }) => followerId === loggedInUser,
    ),
  };

  return (
    <div className="bg-card h-fit w-full space-y-5 rounded-2xl p-5 shadow-sm">
      <UserAvatar
        avatarUrl={user.avatarUrl}
        size={250}
        className="mx-auto size-full max-h-60 max-w-60 rounded-full"
      />

      <div className="flex flex-wrap gap-3 sm:flex-nowrap">
        <div className="me-auto space-y-3">
          <div>
            <h1 className="text-3xl font-bold">{user.displayName}</h1>
            <div className="text-muted-foreground">@{user.username}</div>
          </div>
          <div>Member since {formatDate(user.createdAt, "MMM d, yyyy")}</div>
          <div className="flex items-center gap-3">
            <span>
              Posts:{" "}
              <span className="font-semibold">
                {formatNumber(user._count.posts)}
              </span>
            </span>

            <FollowAccount userId={user.id} initialState={followerInfo} />
          </div>
        </div>

        {user.id === loggedInUser ? (
          <Button>Edit profile</Button>
        ) : (
          <FollowButton userId={user.id} initialState={followerInfo} />
        )}
      </div>

      {user.bio && (
        <>
          <hr />
          <div className="overflow-hidden break-words whitespace-pre-line">
            {user.bio}
          </div>
        </>
      )}
    </div>
  );
}
