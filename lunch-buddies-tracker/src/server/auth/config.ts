import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type DefaultSession, type NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { db } from "~/server/db";
import { Resend } from "resend";
import { cookies } from "next/headers";

const resend = new Resend(process.env.RESEND_API_KEY);

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    EmailProvider({
      server: { //this calls the .env file, gets data from there
        host: process.env.EMAIL_SERVER_HOST,
        port: parseInt(process.env.EMAIL_SERVER_PORT || "587"),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM!,
      async sendVerificationRequest({ identifier, url }) {
        try {
          console.log("📧 Sending email to:", identifier);
          console.log("🔗 Verification URL:", url);
          //this code actually sends the email, right now it only works for myself, local sending only
          await resend.emails.send({
            from: process.env.EMAIL_FROM!,
            to: identifier,
            subject: "One time sign in link for Lunch Buddies!",
            html: `<p>Click <a href="${url}">here</a> to sign in to Lunch Buddies.</p>`,
          });
          console.log("Email sent!");
        } catch (error) {
          console.error("Failed to send email:", error);
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  events: {
    async createUser(user) {
      try {
        const cookieStore = await cookies();
        const name = cookieStore.get("pending_name")?.value;

        if (name) {
          await db.user.update({
            where: { id: user.user.id },
            data: { name },
          });
        }
      } catch (error) {
        console.error("Failed to update name in createUser:", error);
      }
    },
  },
}


