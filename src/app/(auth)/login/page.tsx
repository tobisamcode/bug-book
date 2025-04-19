import { Metadata } from "next";
import LoginForm from "./components/login-form";
import Link from "next/link";
import Image from "next/image";

import LoginImage from "@/assets/login-image.jpg";

export const metadata: Metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="bg-card flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl shadow-2xl">
        <div className="w-fit space-y-10 overflow-y-auto p-10 md:w-1/2">
          <h1 className="text-center text-3xl font-bold">Login to bugbook</h1>

          <div className="space-y-5">
            <LoginForm />

            <Link
              href="/signup"
              className="block text-center text-xs hover:underline"
            >
              Don&apos;t have an account? Sign up
            </Link>
          </div>
        </div>

        <Image
          src={LoginImage}
          alt="Login Image"
          className="hidden w-1/2 object-cover md:block"
        />
      </div>
    </main>
  );
}
