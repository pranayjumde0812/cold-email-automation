# 📧 Cold Email Automation (Node.js + TypeScript)

A simple and safe cold email automation system built using **Node.js**, **TypeScript**, and **Nodemailer**.

This tool reads recruiter data from a CSV file and sends personalized cold emails with a resume attachment, including delay control to avoid spam detection.

---

## 🚀 Features

- Send personalized emails from CSV
- Resume attachment support
- 30-second delay between emails (anti-spam safe)
- Gmail App Password authentication
- TypeScript support
- Error handling & validation
- Secure `.env` configuration

---

## 📁 Project Structure

```
cold-email-automation/
├── src/
│   └── sendEmails.ts
├── emails.csv
├── Pranay-Jumde-Java-Developer.pdf
├── .env
├── .env.example
├── tsconfig.json
├── package.json
└── .gitignore
```

---

## ⚙️ Installation

### 1️⃣ Clone Repository

```
git clone https://github.com/YOUR_USERNAME/cold-email-automation.git
cd cold-email-automation
```

---

### 2️⃣ Install Dependencies

```
yarn install
```

---

### 3️⃣ Create `.env` File

Create a file named `.env` in the root folder:

```
EMAIL_USER=yourgmail@gmail.com
EMAIL_PASS=your_gmail_app_password
```

⚠️ Use **Gmail App Password**, NOT your actual Gmail password.

---

### 4️⃣ Prepare `emails.csv`

Create a file named `emails.csv`:

```
name,email,company
Rahul Sharma,rahul@gmail.com,TCS
Priya Mehta,priya@gmail.com,Infosys
```

---

### 5️⃣ Add Resume

Place your resume file in the project root:

```
Pranay-Jumde-Java-Developer.pdf
```

Make sure the filename matches the one used inside `sendEmails.ts`.

---

## 🧪 Run the Project

### Development Mode

```
yarn dev
```

### Production Mode

```
yarn build
yarn start
```

---

## 📬 How It Works

1. Reads recruiter data from `emails.csv`
2. Personalizes the email using name & company
3. Attaches resume
4. Sends email
5. Waits 30 seconds before sending the next email

---

## ⚠️ Important Guidelines

- Send maximum **20–30 emails per day**
- Always keep delay enabled
- Keep email short and professional
- Use Gmail App Password
- Never commit `.env` to GitHub

---

## 🔮 Future Improvements

- Queue system with Redis + BullMQ
- Automatic follow-up emails
- Email open tracking
- Logging system
- AI-based personalization

---

## 👨‍💻 Author

**Pranay Jumde**

Backend Developer  
Node.js | TypeScript | PostgreSQL | Redis | Docker

---

## 📜 License

MIT