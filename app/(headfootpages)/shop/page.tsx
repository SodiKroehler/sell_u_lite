import Tarryer from '@components/Tarryer'
import PreviewPage from '@components/Stripe_default_page'
// import { Stripe, loadStripe } from '@stripe/stripe-js';
// import {getClientStripe} from '@lib/stripeFlam'
import { debugm } from '@lib/logger/flamLogger'

// import {getClientStripe} from '@lib/stripeFlam'



// const striper = async(u) => {

//   debugm("prerender url",u);

//   getClientStripe();
//   const surl = await fetch(u, {method: "POST"})
//     .then(r => r.json());
//   debugm("returned url",surl.json());
// }

export default async function Shop() {

  // let stripeAPI = process.env.NEXTAUTH_URL + '/api/checkout_sessions';

  return (
    // <main style={{width:'100vw', height: '100vh'}}>
    <main className='w-full h-full justify-center items-center text-center align-middle'>
      {/* <Tarryer  /> */}
      {/* <PreviewPage /> */}
      <p className='text-xl'>Coming Soon!</p>
    </main>
  )
}