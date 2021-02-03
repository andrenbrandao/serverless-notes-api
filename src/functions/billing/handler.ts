import Stripe from 'stripe';
import handler from '@libs/handler-lib';
import { calculateCost } from '@libs/billing-lib';

const chargeUser = async (event, context) => {
  const { storage, source } = JSON.parse(event.body);
  const amount = calculateCost(storage);
  const description = 'Scratch charge';

  // Load our secret key from the  environment variables
  const stripe = new Stripe(process.env.stripeSecretKey, {
    apiVersion: '2020-08-27',
  });

  await stripe.charges.create({
    source,
    amount,
    description,
    currency: 'usd',
  });

  return { status: true };
};

export const main = handler(chargeUser);
