import { COLORS } from '@styles/colors.js'
import { debug, debugm } from '@lib/logger/flamLogger'
import { sendEmail } from './../email/flamMailer'
import { waitUntil } from '@vercel/functions';

// export async function flamSendVerificationRequest(params) {
//   const { identifier, url, provider, theme } = params
//   const { host } = new URL(url)

//   debug("before emailResult")
//   const emailResult = await sendEmail(identifier, `Sign in to ${host}`, text({ url, host }), html({ url, host, theme })).then((r) => {
//     debugm("email res prom fulfilled, got ", r);
//     return r
//   })
//   return emailResult
// }
export async function flamSendVerificationRequest(params) {
  const { identifier, url, provider, theme } = params
  const { host } = new URL(url)

  const emailResult = await sendEmail(identifier, `Sign in to ${host}`, text({ url, host }), html({ url, host, theme }))
  return Promise.resolve(emailResult)
  // .then((r) => {
  //   debugm("email res prom fulfilled, got ", r);
  //   return r
  // }))
}
// export async function flamSendVerificationRequest(params) {
//   const { identifier, url, provider, theme } = params
//   const { host } = new URL(url)

//   const promise1 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (true) {
//         resolve('succes')
//       } else {
//         reject('failure')
//       }
//     }, 4000)
//   })
//   promise1.then(result => console.log(result))
//   return await promise1
// }


function html(params: { url: string; host: string; theme: any }) {
  const { url, host, } = params

  const escapedHost = host.replace(/\./g, "&#8203;.")

  const color = {
    background: COLORS.LIGHT._,
    text: COLORS.DARK._,
    mainBackground: COLORS.LIGHT._,
    buttonBackground: COLORS.PRI._,
    buttonBorder: COLORS.PRI.alt_dark1,
    buttonText: COLORS.DARK._,
  }

  return `
  <body style="background: ${color.background};">
    <table width="100%" border="0" cellspacing="20" cellpadding="0"
      style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
      <tr>
        <td align="center"
          style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
          sign in to <strong>chitters</strong>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 20px 0;">
          <table border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><a href="${url}"
                  
                  style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">Sign
                  in</a></td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td align="center"
          style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
          If you did not request this email you can safely ignore it.
        </td>
      </tr>
    </table>
  </body>
  `
}

/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
function text({ url, host }: { url: string; host: string }) {
  return `Sign in to chitters\n${url}\n\n`
}
