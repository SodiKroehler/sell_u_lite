'use client'
import React from 'react';
// import { loadStripe } from '@stripe/stripe-js';
import {getClientStripe} from '@lib/stripeFlam'
import {debugm} from '../lib/logger/flamLogger'
import {storeSlice, checkout} from '@lib/redux/slices/storeSlice'
import { useAppDispatch, useAppSelector } from "@lib/redux/hooks";



getClientStripe();

export default function PreviewPage(stripeAPIURL) {
  // let storeState = useAppSelector((state) => state.gameReducer.storeState);
  const dispatch = useAppDispatch();

  const checkerOuter = () => {
    dispatch(checkout())
  }

  return (
    <div>
     <button onClick={checkerOuter}>buy</button>
    <form action="/api/checkout_sessions" method="POST">
      <section>
        <button type="submit" role="link">
          Checkout
        </button>
      </section>
      <style jsx>
        {`
          section {
            background: #ffffff;
            display: flex;
            flex-direction: column;
            width: 400px;
            height: 112px;
            border-radius: 6px;
            justify-content: space-between;
          }
          button {
            height: 36px;
            background: #556cd6;
            border-radius: 4px;
            color: white;
            border: 0;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
          }
          button:hover {
            opacity: 0.8;
          }
        `}
      </style>
    </form>
    </div>
  );
}