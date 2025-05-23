import type { Session } from "next-auth";
import { getServerSession } from "next-auth/next";
import { authOptions } from "~/server/auth/config";


export default async function Home() {
  //session gets authOptions from auth/config.ts using imported function from next
  const session: Session | null = await getServerSession(authOptions);
  //makes sure there is a user in session that isnt null
  const hasUser = session && typeof session === "object" && "user" in session && session.user != null;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1>Welcome to LunchBuddies!</h1>
        <h2>Your hub for tracking your lunch partners!</h2>
        {hasUser ? (
          <p>Welcome {(session as any).user.email}</p>
        ) : (
          <a href="/signin">Sign in</a>
        )}
      </div>
    </main>
  );
}
