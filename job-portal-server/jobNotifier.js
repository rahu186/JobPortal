const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const { MongoClient } = require("mongodb");
require('dotenv').config();

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(require("./firebaseAdmin.json")), // Replace with your service account JSON file
});

// Firestore initialization
const db = admin.firestore();
const subscribersRef = db.collection("subscribers"); // Subscribers collection in Firestore

// MongoDB connection setup
const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@careerplusjobportal.30xmi.mongodb.net/?retryWrites=true&w=majority&appName=CareerPlusJobPortal`;
// MongoDB URI
const client = new MongoClient(mongoUri);
const demoJobsCollection = client.db("mernJobPortal").collection("demoJobs");

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Replace with your email provider if needed
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app-specific password
  }
});

// Function to fetch all subscriber emails from Firestore
const getSubscribersEmails = async () => {
  const snapshot = await subscribersRef.get();
  const emails = [];
  snapshot.forEach(doc => {
    emails.push(doc.data().email); // Assuming subscriber documents have a field 'email'
  });
  return emails;
};

// Function to send email notification
const sendEmailNotification = async (newJob) => {
  const subscribers = await getSubscribersEmails();
  const jobDetails = `
    New Job Added:
    Title: ${newJob.jobTitle}
    Company: ${newJob.companyName}
    Location: ${newJob.jobLocation}
    Salary: ${newJob.minPrice}-${newJob.maxPrice}
    Description: ${newJob.description}
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender address
    to: subscribers.join(", "), // Recipient list
    subject: `New Job Added: ${newJob.jobTitle}`,
    text: jobDetails,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully to all subscribers");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Watch for new job insertions in the MongoDB demoJobs collection
const watchJobUpdates = async () => {
  const changeStream = demoJobsCollection.watch();

  changeStream.on("change", async (change) => {
    if (change.operationType === "insert") { // Trigger email only when a new job is added
      const newJob = change.fullDocument; // On new insert, get the full document
      console.log("New job added:", newJob);

      // Send email notification to all subscribers about the new job
      await sendEmailNotification(newJob);
    }
  });
};

// Start watching for MongoDB job updates
client.connect()
  .then(() => {
    console.log("Connected to MongoDB");
    watchJobUpdates(); // Start watching for job updates
  })
  .catch(err => {
    console.error("Error connecting to MongoDB:", err);
  });
