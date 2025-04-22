import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";
import SessionProvider from "./session-provider";
import Navbar from "./nav-bar";
import MenuBar from "./menu-bar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await validateRequest();

  if (!session.user) {
    return redirect("/login");
  }

  return (
    <SessionProvider value={session}>
      <div className="bg-secondary/70 flex min-h-screen flex-col">
        <Navbar />
        <div className="mx-auto flex w-full max-w-7xl grow gap-5 p-5">
          <MenuBar className="bg-card sticky top-[5.25rem] hidden h-fit flex-none space-y-3 rounded-xl px-3 py-5 shadow-sm sm:block xl:w-80" />
          {children}
        </div>
      </div>
    </SessionProvider>
  );
}
