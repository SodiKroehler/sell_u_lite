import { Stripe, loadStripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;
let clientStripePromise: Promise<Stripe | null>;
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = require('stripe')(process.env.STRIPE_SECRET_KEY);
    // stripePromise = loadStripe(process.env.STRIPE_SECRET_KEY!);
  }
  return stripePromise;
};

export const getClientStripe = () => {
  if (!clientStripePromise){
    const stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
    );
  }
  return clientStripePromise;
}
