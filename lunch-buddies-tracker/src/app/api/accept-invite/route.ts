import { db } from '~/server/db';
import { invites } from 'src/app/api/store'
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const inviteId = searchParams.get('invite_id');

    if (!inviteId) {
        return new Response("Missing invite ID", { status: 400 });
    }

    const invite = await db.lunchInvite.findUnique({
        where: { id: inviteId },
    });

    if (!invite || invite.status !== 'pending') {
        return new Response("Invalid or already accepted invite", { status: 400 });
    }

    const check = await db.lunchInvite.count({
        where: {
            senderId: invite.senderId,
            receiverId: invite.receiverId
        }
    });

    if (check === 1) {
        await db.$transaction([
            db.lunchInvite.update({
                where: { id: inviteId },
                data: { status: 'accepted' },
            }),
            db.user.update({
                where: { id: invite.senderId },
                data: { points: { increment: 2 } },
            }),
            db.user.update({
                where: { id: invite.receiverId },
                data: { points: { increment: 2 } },
            }),
        ]);
    }
    else {
        await db.$transaction([
            db.lunchInvite.update({
                where: { id: inviteId },
                data: { status: 'accepted' },
            }),
            db.user.update({
                where: { id: invite.senderId },
                data: { points: { increment: 1 } },
            }),
            db.user.update({
                where: { id: invite.receiverId },
                data: { points: { increment: 1 } },
            }),
        ]);
    }

    return new Response(`Invite accepted! Points awarded`,
        {
            status: 200,
            headers: { 'content-type': 'text/html' }
        });
}
