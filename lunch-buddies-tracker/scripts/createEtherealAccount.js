// scripts/createEtherealAccount.js
import nodemailer from "nodemailer";

async function main() {
    const testAccount = await nodemailer.createTestAccount();
    console.log("Ethereal account:");
    console.log(`  USER: ${testAccount.user}`);
    console.log(`  PASS: ${testAccount.pass}`);
}

main().catch(console.error);
