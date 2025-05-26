"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

//this is a page to get redirected to while updating the name in the record via the magic link, then gets sent to home

export default function PostAuthPage() {
    const router = useRouter();

    useEffect(() => {
        const finalizeUser = async () => {
            const name = Cookies.get("pending_name"); //similar to local storage
            if (name) {
                await fetch("/api/update-name", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name }),
                });
                Cookies.remove("pending_name");
            }
            router.push("/"); //reroute back home
        };
        finalizeUser();
    }, [router]);

    return <p>Signing you in...</p>;
}
