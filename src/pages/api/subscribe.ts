import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import { stripe } from 'services/stripe';

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === 'POST') {
    const session = await getSession({ request });

    const stripeCustumer = await stripe.customers.create({
      email: session?.user.email,
    });

    const stripeCheckoutSection = await stripe.checkout.sessions.create({
      customer: stripeCustumer.id,
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      line_items: [
        {
          price: 'price_1IYWHZJdQBJH6dfI7ut4uuKO',
          quantity: 1,
        },
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      success_url: `${process.env.STRIPE_SUCCES_URL}`,
      cancel_url: `${process.env.STRIPE_CANCEL_URL}`,
    });
    return response.status(200).json({ sessionId: stripeCheckoutSection.id });
  }

  response.setHeader('Allw', 'POST');
  response.status(405).end('Method Not Allowed');
};
