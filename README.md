# LunchBuddies

This is an application for employees to track, schedule and log their paired lunch times with other coworkers to see who has the most points at the end of the month!


DEV UNDERSTANDING

default page.tsx has 3 files stemming from it
signin, leaderboard and invites

signin - has a form that sends that data to the backend service on submit, also stores a cookie for the name to be populated after the record. calls a sign in function - not ours, from a library. once the signin is completed, redirected to post-auth that is the temporary page for adding name to record, THEN gets sent to the home page.

leaderboard - default export is a query that selects the 5 users with the highest points in the database and shows them dynamically. 

invites - this is a page for sending invites, default export that on submit stores all the form information to the database via an api call in the lunchInvites table. 


BACKEND UNDERSTANDING

config.ts is where our email function exists, this is where emails are sent using resend (locally now). and where the callback for the adding name is. 

TODO NEXT
1. Make it so that invites need to be unique? or you get more points for a unique invite?