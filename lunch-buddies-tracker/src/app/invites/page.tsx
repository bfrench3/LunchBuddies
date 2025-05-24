'use client';

import { useState } from "react";

export default function () {
    const [invitee, setInvitee] = useState('');
    const [eventDate, seteventDate] = useState('');
    const [eventTime, seteventTime] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Invitee:", invitee);
        console.log("event time:", eventTime);
        console.log("event date:", eventDate);
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
            <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
                <h1>Lunch Invites page</h1>
                <br></br>
                <br></br>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="invitee">Person to invite</label><br></br>
                    <input type="input" id="invitee" value={invitee} onChange={(e) => {
                        setInvitee(e.target.value)
                    }}></input>
                    <br></br><br></br>
                    <label htmlFor="eventDate">Set a date</label><br></br>
                    <input type="date" id="eventDate" value={eventDate} onChange={(e) => {
                        seteventDate(e.target.value)
                    }}></input>
                    <br></br><br></br>
                    <label htmlFor="eventTime">Set a time</label><br></br>
                    <input type="time" id="eventTime" value={eventTime} onChange={(e) => {
                        seteventTime(e.target.value)
                    }}></input>
                    <br></br><br></br>
                    <button type="submit" className="text-blue-600 underline">submit</button>
                </form>
            </div>
        </main>
    );
}