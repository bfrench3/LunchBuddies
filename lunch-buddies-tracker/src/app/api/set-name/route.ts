import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth/config";
import { db } from "~/server/db";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    const { name } = await req.json();

    if (!session?.user?.email) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    //this updates the record in the database adding the name to the user that has been created
    await db.user.update({
        where: { email: session.user.email },
        data: { name },
    });

    return NextResponse.json({ success: true });
}
