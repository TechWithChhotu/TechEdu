import createTwilioClient from "twilio";
import { config } from "dotenv";
process.env.DOTENV_CONFIG_QUIET = "true";
config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const senderPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const twilioClient = createTwilioClient(accountSid, authToken);

import { generateOTP } from "../helper/helper.js";

const sendOTPonNumber = async (clientPhoneNumber = "+918920823219") => {
  try {
    const OTP = generateOTP();
    return await twilioClient.messages
      .create({
        body: `Learn Online, your varification code is ${OTP}. ThankU team TechEdu`,
        to: clientPhoneNumber,
        from: senderPhoneNumber, // From a valid Twilio number
      })
      .then((message) => {
        return OTP;
      });
  } catch (err) {
    console.log(err);
  }
};

export default sendOTPonNumber;
