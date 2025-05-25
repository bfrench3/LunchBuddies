import { Resend } from 'resend';
import { db } from '~/server/db';
import { v4 as uuidv4 } from 'uuid';
import { invites } from 'src/app/api/store';


export async function POST(req: Request) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await req.json();
    const { invitee, name, eventDate, eventTime } = body;
    const invite_id = uuidv4();
    const sender = await db.user.findFirst({
        where: { name }, // or use session user if available
    });

    const receiver = await db.user.findUnique({
        where: { email: invitee },
    });
    if (!sender || !receiver) {
        return new Response(JSON.stringify({ message: "Sender or invitee not found in the database" }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
        });

    }
    const newInvite = await db.lunchInvite.create({
        data: {
            id: invite_id,
            senderId: sender.id,
            receiverId: receiver.id,
            status: "pending",
            date: new Date(`${eventDate}T${eventTime}`)
        }
    });


    invites.set(invite_id, {
        name,
        invitee,
        eventDate,
        eventTime,
        accepted: false
    });
    try {
        const data = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: invitee,
            subject: `Lunch invite from ${name}`,
            html: `
                <p>You've been invited to lunch by ${name}</p>
                <p>Date: ${eventDate}</p>
                <p>Time: ${eventTime}</p>
                <a href="http://localhost:3000/api/accept-invite?invite_id=${newInvite.id}" style="display:inline-block;margin-top:12px;padding:10px 20px;background-color:#22c55e;color:white;text-decoration:none;border-radius:4px;">
                Accept Invite
                </a>
                `
        });
        console.log("email sent data: ", data)
        return Response.json(data);

    } catch (error) {
        return Response.json({ error });
    }
}