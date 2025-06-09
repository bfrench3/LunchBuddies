"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Cookies from "js-cookie";

export default function SignInPage() {
    //react frontend components
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        console.log(email);
        Cookies.set("pending_name", name, { expires: 1 });
        e.preventDefault(); //cannot be empty
        await signIn("email", {
            email,
            callbackUrl: "/post-auth", //go here once sign in is done
        });
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
            <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
                <form onSubmit={handleSubmit}>
                    <input type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name" />
                    <input type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                    <br></br><br></br>
                    <button
                        type="submit"
                        className="mt-4 px-6 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-semibold shadow-md transition duration-300"
                    >
                        Create account
                    </button>

                </form>
            </div>
        </main>
    );
}
