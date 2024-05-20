import { google } from "googleapis";
import { debug, debugm } from '@lib/logger/flamLogger'
import { createTransport } from "nodemailer";
//https://docs.emailengine.app/gmail-oauth-service-accounts/?utm_source=nodemailer&utm_campaign=nodemailer&utm_medium=oauth-link

export async function sendEmail(recipient, subject, textBody, htmlBody) {
  const createTransportOptions = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    requireTLS: true,
    auth: {
      type: 'OAuth2',
      user: process.env.GMAIL_AUTH_USER,
      serviceClient: process.env.GMAIL_SERVICE_CLIENT_ID,
      privateKey: process.env.GMAIL_SERVICE_PRIVATE_KEY
    },
    debug: true,
  }

  const sendMailOptions = {
    to: recipient,
    from: process.env.GMAIL_SERVICE_CLIENT_EMAIL,
    subject: subject,
    text: textBody,
    html: htmlBody,
  }

  const transport = await createTransport(createTransportOptions)

  let verifiedTransport = await transport.verify(verifyCallback)

  const sendMail = await transport.sendMail(sendMailOptions)
    .catch((anyError) => {
      debugm("error in send mail", anyError)
    })

  return Promise.resolve(sendMail)
}

const verifyCallback = (error, success) => {
  if (error) {
    debugm("verify error", error);
  } else {
    debug("verification success");
  }
}

// export async function sendEmail(recipient, subject, textBody, htmlBody) {
//   debug("got to send Email")
//   const transport = await createTransport({
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true,
//     requireTLS: true,
//     auth: {
//       type: 'OAuth2',
//       user: process.env.GMAIL_AUTH_USER,
//       serviceClient: process.env.GMAIL_SERVICE_CLIENT_ID,
//       privateKey: process.env.GMAIL_SERVICE_PRIVATE_KEY
//     },
//     debug: true,
//   });

//   // const verifyRes = await transport.verify();


//   let verify = transport.verify(function (error, success) {
//     if (error) {
//       debugm("transport verify error", error);
//       console.log(error)
//       return error
//     } else {
//       debug("Server is ready to take our messages");
//       return 200
//     }
//   });

//   // let result;
//   if (await verify === 200) {
//     return verify
//   }
//   const sendMail = await transport.sendMail({
//     to: recipient,
//     from: process.env.GMAIL_SERVICE_CLIENT_EMAIL,
//     subject: subject,
//     text: textBody,
//     html: htmlBody,
//   }, (err, info) => {
//     debug("callback called on sendMail complete")
//     if (err) {
//       debugm("send mail error", err)
//       return err
//     } else {
//       return info
//     }
//   });

//   // debug("Message sent: %s", result.messageId);
//   // debugm("result is", result)
//   // debug("testing debug")
//   return sendMail
// }
