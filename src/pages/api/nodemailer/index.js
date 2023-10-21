import { sendMail, sendPurchaseConfirmation } from "../service/mailService";

const handlerMail = async (req, res) => {
  try {
    const { method, body } = req;
    console.log("pasando por el handlerMail 1", method, body);
    switch (method) {
      case "POST": {
        const {
          subject,
          toEmail,
          otpText,
          loginText,
          productSummary,
          isPurchase,
        } = body;

        try {
          if (otpText) {
            await sendMail(subject, toEmail, otpText);
          } else if (loginText) {
            await sendMail(subject, toEmail, null, loginText);
          }

          if (isPurchase) {
            await sendPurchaseConfirmation(toEmail, productSummary);
            res.status(200).send("Purchase confirmation email sent");
          } else {
            res.status(200).send("General email sent");
          }
        } catch (error) {
          console.error("Error sending email:", error);
          res.status(500).send("An error occurred while sending the email.");
        }

        break;
      }
      case "GET": {
        res.status(200).send(req.auth_data);
        break;
      }
      default:
        res.setHeader("Allow", ["POST", "GET", "PUT", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
        break;
    }
  } catch (err) {
    res.status(500).json({
      error_code: "api_error",
      message: err.message,
    });
  }
};

export default handlerMail;
