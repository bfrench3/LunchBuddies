import { Resend } from 'resend';
import { v4 as uuidv4 } from 'uuid';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    const body = await req.json();
    const { invitee, name, eventDate, eventTime } = body;
    const invite_id = uuidv4();
    try {
        const data = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: invitee,
            subject: `Lunch invite from ${name}`,
            html: `
                <p>You've been invited to lunch by ${name}</p>
                <p>Date: ${eventDate}</p>
                <p>Time: ${eventTime}</p>
                <a href="http://localhost:3000/api/accept-invite?invite_id=${invite_id}" style="display:inline-block;margin-top:12px;padding:10px 20px;background-color:#22c55e;color:white;text-decoration:none;border-radius:4px;">
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