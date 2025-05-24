import { db } from "~/server/db";

//this export function gets automatically invoked when this route is called, function doesnt have to be called

//query for finding top points in the database
export default async function LeaderboardPage() {
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
        <main className="max-w-2xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>
            <ul>
                {topUsers.map((user) => (
                    <li key={user.id} className="flex items-center gap-4 mb-4">
                        <div>
                            <p className="font-semibold">{user.name ?? "Unnamed User"}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                        <div className="ml-auto font-bold">{user.points} pts</div>
                    </li>
                ))}
            </ul>
        </main>
    );
}
