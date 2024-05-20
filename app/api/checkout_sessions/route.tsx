// import {getStripe} from '@lib/stripeFlam'
import { Stripe } from '@stripe/stripe-js';
import { getServerSession } from "next-auth/next"
import { headers } from 'next/headers'
import { NextResponse } from "next/server";
import { redirect } from 'next/navigation'
import { prismaFlam } from "@lib/prismaFlam";
import { authOptions } from "@lib/auth/authOptions";
import { debug, debugm } from '@lib/logger/flamLogger';


export async function POST(req, res: NextResponse) {

  const sucURL = `${process.env.NEXTAUTH_URL}/shop/?success=true`
  const cancelURL = `${process.env.NEXTAUTH_URL}/shop/?canceled=true`

  const headersList = headers()
  const host = headersList.get('host')

  const auth_session = await getServerSession(authOptions)
  if (!auth_session) {
    return NextResponse.json({ status: 403 })
  }

  const user = await prismaFlam.user.findUnique({
    where: { email: auth_session?.user?.email ?? undefined },
  })

  try {
    // const stripe = await getStripe();
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    // Create Checkout Sessions from body params.
    const session = await stripe!.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: 'price_1NXPE3EuQnVOIC4GSQ8Pw3ka',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: sucURL,
      cancel_url: cancelURL,
      automatic_tax: { enabled: true },
      metadata: { "userId": user?.id }
    });

    return NextResponse.redirect(session.url, { status: 303 });

  } catch (err) {
    debugm("stripe error", err)
    return NextResponse.json({ status: (err.statusCode || 500), msg: err.message })
  }
}


// https://stackoverflow.com/questions/75652354/how-to-access-request-body-in-nextjs-13-2-route-handler