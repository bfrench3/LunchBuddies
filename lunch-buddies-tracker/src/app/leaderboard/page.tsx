import { db } from "~/server/db";
import Link from "next/link";
import type { Session } from "next-auth";
import { getServerSession } from "next-auth/next";
import { authOptions } from "~/server/auth/config";
import { redirect } from "next/navigation";

//this export function gets automatically invoked when this route is called, function doesnt have to be called

//query for finding top points in the database
export default async function LeaderboardPage() {
    const session: Session | null = await getServerSession(authOptions);
    //makes sure there is a user in session that isnt null
    const hasUser = session && typeof session === "object" && "user" in session && session.user != null;
    if (!hasUser) {
        redirect('/signin');
    }
    let i = 1;
    const topUsers = await db.user.findMany({
        orderBy: { points: "desc" },
        take: 5,
        select: {
            id: true,
            name: true,
            email: true,
            points: true
        },
    })
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
            <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
                <Link href="./" className="text-blue-600 underline">Home</Link>
                <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>
                <ul>
                    {topUsers.map((user, i) => (
                        <li key={user.id} className="flex items-center gap-4 mb-4">
                            <div>
                                <p className="font-semibold">{i + 1}. {user.name ?? "Unnamed User"}</p>
                                <p className="text-sm text-gray-500">{user.email}</p>
                            </div>
                            <div className="ml-auto font-bold">{user.points} pts</div>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}
