# LunchBuddies

This is an application for employees to track, schedule and log their paired lunch times with other coworkers to see who has the most points at the end of the month!


DEV UNDERSTANDING
1. The app enters at src/app/page.tsx. this is the frontend main page. gets session info from config.ts using boilerplate code. config.ts is for nextauth verifications via email
2. if no user, there is a clickable element in it that redirects to the code in src/app/signin/page.tsx. this is the code that sends the user an 'email' to verify they are a user. still needs to get this code to interact with the database. 
3. route.ts sends handlers for requests, kind of like a middleman for the communication between things.
4. schema.prisma is our database layout. once emails start populating, everything will populate!
5. when you enter another page.tsx (called via a route) the default export function gets invoked, 
you dont have to explicitly call it anywhere



TODO NEXT
1. Get emails to send actually
2. set up lunch invites / points
3. leaderboards for points - DONE