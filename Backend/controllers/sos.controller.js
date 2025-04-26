import nodemailer from 'nodemailer';
import emailTransporter from '../config/emailConfig.js';
import axios from 'axios';
import dotenv from "dotenv";

dotenv.config();

// Helper function to send SMS using Fast2SMS
const sendSMSUsingFast2SMS = async (phone, message) => {
  try {
    const response = await axios.post(
      'https://www.fast2sms.com/dev/bulkV2',
      {
        route: 'dlt_manual',  // Important for DLT templates
        message: message,     // Must match your DLT approved template exactly
        language: 'english',
        flash: 0,
        numbers: phone,       // 10-digit number (no +91)
        sender_id: process.env.FAST2SMS_SENDER_ID, // Your approved sender id (like "FSTSMS")
        template_id: process.env.FAST2SMS_TEMPLATE_ID, // Your approved DLT Template ID
      },
      {
        headers: {
          'authorization': process.env.FAST2SMS_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(`SMS sent to ${phone}:`, response.data);
  } catch (error) {
    console.error(`Error sending SMS to ${phone}:`, error.response ? error.response.data : error.message);
  }
};

// Controller function to send SOS alert
export const sendSOSAlert = async (req, res) => {
  const { contacts, message, location } = req.body;

  try {
    console.log('Contacts:', contacts);
    console.log('Message:', message);
    console.log('Location:', location);

    // Sending email to all contacts
    contacts.forEach(async (contact) => {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: contact.email,
        subject: 'Emergency SOS Alert',
        text: `${message}\nLocation: ${location}`,
      };

      console.log(`Sending email to: ${contact.email}`);

      try {
        await emailTransporter.sendMail(mailOptions);
        console.log(`Email sent to ${contact.email}`);
      } catch (error) {
        console.log(`Error sending email to ${contact.email}: ${error.message}`);
      }
    });

    // Sending SMS to all contacts using Fast2SMS
    contacts.forEach(async (contact) => {
      const phone = contact.phone; // Direct use - no slicing needed

      console.log(`Sending SMS to: ${phone}`);

      // Important: SMS Message MUST match DLT Template
      const smsMessage = `${message}\nLocation: ${location}`; 

      await sendSMSUsingFast2SMS(phone, smsMessage);
    });

    res.status(200).send({ success: true, message: 'SOS sent successfully.' });
  } catch (error) {
    console.log('Error sending SOS alert:', error.message);
    res.status(500).send({ success: false, message: 'Error sending SOS alert.' });
  }
};