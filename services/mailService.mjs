import nodemailer from 'nodemailer';
import AWS from "aws-sdk";

/* This is the class responsible for the business logic
* that will send emails to me from people reaching out from
* my portfolio page "contact" section.
*/
class EmailService {
    // AWS SES configurations + nodemailer transporter configs
    constructor() {
        AWS.config.update({
            accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
            region: process.env.AWS_SES_REGION
        });

        this.transporter = nodemailer.createTransport({
            SES: new AWS.SES({
                apiVersion: '2010-12-01'
            })
        });
    }

    // Method responsible for sending emails
    async sendEmail(subject, name, recipientEmail, text) {
        const mailOptions = {
            from: 'chevyjd2007@gmail.com', 
            to: 'chevyjd2007@gmail.com',
            subject: "Subject: " + subject + " | From: " + name + ", " + recipientEmail,
            text,
        };

        try {
            const result = await this.transporter.sendMail(mailOptions);
            return result;
          } catch (error) {
            throw new Error(`Email sending failed: ${error.message}`);
          }
    }
}

export default EmailService;


