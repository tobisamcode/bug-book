import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { generatePostDataInclude, PostsPage } from "@/lib/types";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;

    await new Promise((resolve) => setTimeout(resolve, 3000));

    const pagesize = 10;

    const { user } = await validateRequest();

    if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const posts = await prisma.post.findMany({
      where: {
        user: {
          followers: {
            some: {
              followerId: user.id,
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: pagesize + 1,
      cursor: cursor ? { id: cursor } : undefined,
      include: generatePostDataInclude(user.id),
    });

    const nextCursor = posts.length > pagesize ? posts[pagesize].id : null;

    const data: PostsPage = {
      posts: posts.slice(0, pagesize),
      nextCursor,
    };

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
