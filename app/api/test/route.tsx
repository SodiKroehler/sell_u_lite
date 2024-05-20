import { NextResponse, NextRequest } from 'next/server'
import { sendEmail } from "./../../lib/email/flamMailer"
import { debugm } from '@lib/logger/flamLogger'
import { prismaFlam } from "@lib/prismaFlam";
import { flamSendVerificationRequest } from '@lib/auth/authEmail'

export async function POST() {

  // const result = await sendEmail("sodikroehler@gmail.com", "HelloWord", "helloworld", `<body>asdfad</body>`)
  // debugm("email res", result);

  const pars = { identifier: "sodikroehler@gmail.com", url: "https://www.chitters.net", provider: "provider", theme: "red" }
  // {\"identifier\":\"sodikroehler@gmail.com\",\"token\":\"33d2e0d8b7a4edf50298ba5314cfeda4471a0ee845a0649a5f45dbbf69bde65e\",\
  // "expires\":\"2024-05-19T15:51:51.357Z\",\
  // "url\":\"https://www.chitters.net/api/auth/callback/email?callbackUrl=\
  // https%3A%2F%2Fwww.chitters.net%2Fsignin&token=33d2e0d8b7a4edf50298ba5314cfeda4471a0ee845a0649a5f45dbbf69bde65e&email=sodikroehler%40gmail.com\",\"provider\":{\"id\":\"email\",\"type\":\"email\",\"name\":\"Email\",\"server\":\"smtp.gmail.com\",\"from\":\"sodi@chitters.net\",\"maxAge\":86400,\"signinUrl\":\"https://www.chitters.net/api/auth/signin/email\",\
  // "callbackUrl\":\"https://www.chitters.net/api/auth/callback/email\"},\"theme\":{\"colorScheme\":\"auto\",\"logo\":\"\",\"brandColor\":\"\",\"buttonText\":\"\"}}"}

  // const res2 = await flamSendVerificationRequest(pars)
  // debugm("email res2", res2);

  // return NextResponse.json({ "status": 200 })
  return new NextResponse("404", { status: 404, statusText: "invalid URL" });
}