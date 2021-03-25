import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import { stripe } from 'services/stripe';
import { query as q } from 'faunadb';
import { fauna } from '../../services/fauna';

type User = {
  ref: {
    id: string;
  };
  data: {
    stripeCustumerId: string;
  };
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const session = await getSession({ req });

    const user = await fauna.query<User>(
      q.Get(q.Match(q.Index('user_by_email'), q.Casefold(session?.user.email))),
    );

    let customerId = user.data.stripeCustumerId;

    if (!customerId) {
      const stripeCustumer = await stripe.customers.create({
        email: session?.user.email,
        // metadata
      });

      await fauna.query(
        q.Update(q.Ref(q.Collection('users'), user.ref.id), {
          data: {
            stripeCustumerId: stripeCustumer.id,
          },
        }),
      );

      customerId = stripeCustumer.id;
    }

    const stripeCheckoutSection = await stripe.checkout.sessions.create({
      customer: customerId,
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
    return res.status(200).json({ sessionId: stripeCheckoutSection.id });
  }

  res.setHeader('Allow', 'POST');
  res.status(405).end('Method Not Allowed');
};
