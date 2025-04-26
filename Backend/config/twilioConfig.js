import Twilio from 'twilio';
import dotenv from "dotenv";

dotenv.config();
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
console.log(accountSid, authToken)
const twilioClient = Twilio(accountSid, authToken);

export default twilioClient;