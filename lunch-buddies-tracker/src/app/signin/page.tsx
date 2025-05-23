"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function SignInPage() {
    const [email, setEmail] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        console.log(email)
        e.preventDefault();
        await signIn("email", {
            email,
            callbackUrl: "/",
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
            />
            <button type="submit">Sign in with email</button>
        </form>
    );
}
