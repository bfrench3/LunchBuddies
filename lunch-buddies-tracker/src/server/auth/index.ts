// server/auth/config.ts
import EmailProvider from "next-auth/providers/email";
import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
//import { auth } from "/Users/bofrench/LunchBuddies/lunch-buddies-tracker/src/server/auth/config"
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: parseInt(process.env.EMAIL_SERVER_PORT || "587"),
    auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
    },
});

export const authConfig: NextAuthOptions = {
    providers: [
        EmailProvider({
            server: transporter,
            from: process.env.EMAIL_FROM,
        }),
    ],
    pages: {
        signIn: "/auth/signin",
    },
};

export const { auth, handlers, signIn, signOut } = NextAuth(authConfig);
