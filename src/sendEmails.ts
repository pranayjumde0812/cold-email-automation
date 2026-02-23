import nodemailer from "nodemailer";
import fs from "fs";
import csv from "csv-parser";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

// ✅ Check env variables
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  throw new Error("Missing EMAIL_USER or EMAIL_PASS in .env");
}

// ✅ Verify resume file exists
const resumePath = path.resolve(
  process.cwd(),
  "Pranay-Jumde-Java-Developer.pdf",
);

if (!fs.existsSync(resumePath)) {
  throw new Error("Resume file not found in project root");
}

// ✅ Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Optional: Verify connection
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email configuration error:", error);
  } else {
    console.log("✅ Email server is ready");
  }
});

interface EmailRow {
  name: string;
  email: string;
  company: string;
}

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const sendEmail = async (row: EmailRow) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: row.email.trim(),
    subject: `Backend Developer | Node.js + TypeScript`,
    html: `
      <p>Hi ${row.name.trim()},</p>

      <p>I’m a Backend Developer with experience in 
      <b>Node.js, TypeScript, PostgreSQL, Redis, and Docker</b>.</p>

      <p>I would love to explore backend opportunities at 
      <b>${row.company.trim()}</b>.</p>

      <p>Please find my resume attached.</p>

      <p>Best regards,<br/>
      <b>Pranay Jumde</b></p>
    `,
    attachments: [
      {
        filename: "Pranay_Jumde_Resume.pdf",
        path: resumePath,
      },
    ],
  };

  await transporter.sendMail(mailOptions);
  console.log(`✅ Sent to ${row.email}`);
};

// ✅ Check CSV exists
if (!fs.existsSync("emails.csv")) {
  throw new Error("emails.csv file not found in project root");
}

const emails: EmailRow[] = [];

fs.createReadStream("emails.csv")
  .pipe(csv())
  .on("data", (row) => {
    emails.push({
      name: row.name,
      email: row.email,
      company: row.company,
    });
  })
  .on("end", async () => {
    console.log(`📨 Total emails to send: ${emails.length}`);

    for (const row of emails) {
      try {
        await sendEmail(row);

        // ✅ 30 sec delay to avoid spam detection
        await delay(30000);
      } catch (err) {
        console.error(`❌ Failed for ${row.email}`, err);
      }
    }

    console.log("🎉 All emails processed");
  })
  .on("error", (err) => {
    console.error("❌ Error reading CSV:", err);
  });
