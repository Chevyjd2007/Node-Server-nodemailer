import EmailService from "../../services/mailService.mjs";
import mailService from "../../services/mailService.mjs";

export default async (req, res) => {
    // Checking the type of request
    if (req.method === "POST") {
        const mail = new EmailService();

        try {
            // Destructuring the required parameters from the request body
            const {name, email, subject, message} = req.body;
            // Await is used to here because sendEmail method is asynchronous
            const send = await mail.sendEmail(subject, name, email, message);
            
             // If the email sends successfully, send a 200 response with success status and a message.
            res.status(200).json({ success: true, response: "Email has been sent!", send});
        } catch (error) {
            // send a 500 internal server error response with the error message.
            res.status(500).json({success : false, response: error.send});
        }
    } else {

        res.status(405).json({success : false, response: "This method isn't allowed"});
    }
}