import nodemailer from "nodemailer";
import fs from "fs";
import csv from "csv-parser";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

// ✅ Check environment variables
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  throw new Error("Missing EMAIL_USER or EMAIL_PASS in .env file");
}

// ✅ Resume file path
const resumePath = path.resolve(
  process.cwd(),
  "Pranay-Jumde-Java-Developer.pdf",
);

if (!fs.existsSync(resumePath)) {
  throw new Error("Resume file not found in project root");
}

// ✅ Create email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ Verify email connection
transporter.verify((error) => {
  if (error) {
    console.error("❌ Email configuration error:", error);
  } else {
    console.log("✅ Email server is ready");
  }
});

// ✅ CSV Row Interface
interface EmailRow {
  SNo: string;
  Name: string;
  Email: string;
  Title: string;
  Company: string;
}

// ⏳ Delay function
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

// ✅ Send Email Function
const sendEmail = async (row: EmailRow) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: row.Email.trim(),
    subject: `Application for Java Backend Developer Role`,
    html: `
      <p>Dear ${row.Name.trim()},</p>

      <p>I hope you are doing well.</p>

      <p>I am a <b>Java Backend Developer</b> with <b>1.5 years of experience</b> in building scalable backend applications using 
      <b>Core Java, Spring Boot, REST APIs, and Microservices</b>.</p>

      <p>I am currently exploring new opportunities and would be glad to contribute to 
      <b>${row.Company.trim()}</b> if there are any suitable roles aligned with my profile.</p>

      <p>I have hands-on experience working with databases, Git, and basic AWS services, and have collaborated within agile teams to deliver reliable backend solutions.</p>

      <p>Please find my resume attached for your review. I would be happy to provide any additional information if required.</p>

      <p>
        Thank you for your time and consideration.<br/><br/>

        Warm regards,<br/>
        <b>Pranay Jumde</b><br/>
        Java Backend Developer<br/>
        📞 +91-9657963378<br/>
        📧 pranayjumde13@gmail.com<br/>
        🔗 <a href="https://www.linkedin.com/in/pranay-jumde/">LinkedIn Profile</a>
      </p>
    `,
    attachments: [
      {
        filename: "Pranay_Jumde_Java_Developer_Resume.pdf",
        path: resumePath,
      },
    ],
  };

  await transporter.sendMail(mailOptions);
  console.log(`✅ Sent to ${row.SNo} - ${row.Email} - ${row.Name} at ${row.Company}`);
};

// ✅ Check CSV file exists
if (!fs.existsSync("emails.csv")) {
  throw new Error("emails.csv file not found in project root");
}

const emails: EmailRow[] = [];

// ✅ Read CSV
fs.createReadStream("emails.csv")
  .pipe(csv())
  .on("data", (row) => {
    emails.push({
      SNo: row.SNo,
      Name: row.Name,
      Email: row.Email,
      Title: row.Title,
      Company: row.Company,
    });
  })
  .on("end", async () => {
    console.log(`📨 Total emails to send: ${emails.length}`);

    for (const row of emails) {
      try {
        await sendEmail(row);

        // ⏳ 30 sec delay to reduce spam risk
        await delay(30000);
      } catch (err) {
        console.error(`❌ Failed for ${row.Email}`, err);
      }
    }

    console.log("🎉 All emails processed");
  })
  .on("error", (err) => {
    console.error("❌ Error reading CSV:", err);
  });
